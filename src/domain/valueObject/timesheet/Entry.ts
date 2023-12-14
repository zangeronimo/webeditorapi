import { Messages } from "@application/messages/Messages";
import { EntryTypeEnum } from "@domain/enum";

export class Entry {
  constructor(
    readonly taskId: string,
    readonly userId: string,
    readonly entryType = EntryTypeEnum.OPEN,
    readonly pointDate = new Date()
  ) {}

  validate(dateNow: Date): void {
    const difference = dateNow.getTime() - this.pointDate.getTime();
    const oneMinute = 60000;
    if (difference > oneMinute) return;
    if (dateNow.getMinutes() > this.pointDate.getMinutes()) return;
    throw new Error(Messages.timesheet.EntryRegisteredThisMinute);
  }

  static calculateTotalInHours(entries: Entry[]) {
    let totalCalculated = 0;
    let timeOpen = 0;

    entries
      .sort((a, b) => a.pointDate.getTime() - b.pointDate.getTime())
      .forEach((entry) => {
        if (entry.entryType === EntryTypeEnum.OPEN) {
          timeOpen = entry.pointDate.getTime();
          return;
        }
        totalCalculated += entry.pointDate.getTime() - timeOpen;
      });
    return Math.round(totalCalculated / 1000);
  }
}

import { ITaskRepository } from "@application/interface/repository/timesheet/ITaskRepository";
import { ITaskRegisterWork } from "@application/interface/usecase/timesheet/task";
import { Messages } from "@application/messages/Messages";
import { EntryTypeEnum } from "@domain/enum/EntryTypeEnum";
import { inject } from "@infra/di/Inject";

export class TaskRegisterWork implements ITaskRegisterWork {
  @inject("ITaskRepository")
  _taskRepository?: ITaskRepository;

  async executeAsync(id: string, userId: string, company: string) {
    const checkUserHasOtherTaskOpenedAsync =
      await this._taskRepository?.checkUserHasOtherTaskOpenedAsync(
        userId,
        id,
        company
      );
    if (checkUserHasOtherTaskOpenedAsync) {
      throw new Error(Messages.timesheet.EntryOpened);
    }
    const task = await this._taskRepository?.getByIdAsync(id, company)!;
    if (task === null) {
      throw new Error(Messages.notFound("Task"));
    }
    const lastEntry = task.entries.sort(
      (a, b) => a.pointDate.getTime() - b.pointDate.getTime()
    )[task.entries.length - 1];

    lastEntry?.validate(new Date());
    if (!lastEntry || lastEntry?.entryType === EntryTypeEnum.CLOSE) {
      task.startsWork(userId);
    } else {
      task.stopsWork(userId);
    }
    await this._taskRepository?.updateAsync(task);
    return Promise.resolve();
  }
}

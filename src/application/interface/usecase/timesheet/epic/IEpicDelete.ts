import { EpicDto } from "@domain/dto/timesheet";

export interface IEpicDelete {
  executeAsync(id: string, company: string): Promise<void>;
}

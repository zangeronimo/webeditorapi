import { EpicDto } from "@domain/dto/timesheet";

export interface IEpicGetById {
  executeAsync(id: string, company: string): Promise<EpicDto>;
}

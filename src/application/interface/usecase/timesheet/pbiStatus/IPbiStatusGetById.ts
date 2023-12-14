import { PbiStatusDto } from "@domain/dto/timesheet";

export interface IPbiStatusGetById {
  executeAsync(id: string, company: string): Promise<PbiStatusDto>;
}

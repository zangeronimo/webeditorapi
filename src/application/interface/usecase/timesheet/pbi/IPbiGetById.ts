import { PbiDto } from "@domain/dto/timesheet";

export interface IPbiGetById {
  executeAsync(id: string, userId: string, company: string): Promise<PbiDto>;
}

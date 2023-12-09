import { PbiDto } from "@domain/dto/timesheet";

export interface IPbiDelete {
  executeAsync(id: string, company: string): Promise<PbiDto>;
}

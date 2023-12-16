import { PbiUpdateDataModel } from "@application/model/timesheet/pbi";
import { PbiDto } from "@domain/dto/timesheet";

export interface IPbiUpdate {
  executeAsync(
    pbiData: PbiUpdateDataModel,
    userId: string,
    company: string
  ): Promise<PbiDto>;
}

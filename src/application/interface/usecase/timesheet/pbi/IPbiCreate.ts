import { PbiCreateDataModel } from "@application/model/timesheet/pbi";
import { PbiDto } from "@domain/dto/timesheet";

export interface IPbiCreate {
  executeAsync(pbiData: PbiCreateDataModel, company: string): Promise<PbiDto>;
}

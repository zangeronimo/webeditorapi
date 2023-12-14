import { PbiStatusCreateDataModel } from "@application/model/timesheet/pbiStatus";
import { PbiStatusDto } from "@domain/dto/timesheet";

export interface IPbiStatusCreate {
  executeAsync(
    pbiStatusData: PbiStatusCreateDataModel,
    company: string
  ): Promise<PbiStatusDto>;
}

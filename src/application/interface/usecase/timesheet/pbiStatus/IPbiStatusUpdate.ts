import { PbiStatusUpdateDataModel } from "@application/model/timesheet/pbiStatus";
import { PbiStatusDto } from "@domain/dto/timesheet";

export interface IPbiStatusUpdate {
  executeAsync(
    pbiStatusData: PbiStatusUpdateDataModel,
    company: string
  ): Promise<PbiStatusDto>;
}

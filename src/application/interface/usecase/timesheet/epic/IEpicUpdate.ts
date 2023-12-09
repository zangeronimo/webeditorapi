import { EpicUpdateDataModel } from "@application/model/timesheet/epic";
import { EpicDto } from "@domain/dto/timesheet";

export interface IEpicUpdate {
  executeAsync(
    epicData: EpicUpdateDataModel,
    company: string
  ): Promise<EpicDto>;
}

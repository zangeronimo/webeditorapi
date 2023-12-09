import { EpicCreateDataModel } from "@application/model/timesheet/epic";
import { EpicDto } from "@domain/dto/timesheet";

export interface IEpicCreate {
  executeAsync(
    epicData: EpicCreateDataModel,
    company: string
  ): Promise<EpicDto>;
}

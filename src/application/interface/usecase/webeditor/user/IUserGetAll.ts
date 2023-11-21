import { GetAllUserFilterModel } from "@application/model/webeditor/user/GetAllUserFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IUserGetAll {
  ExecuteAsync(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

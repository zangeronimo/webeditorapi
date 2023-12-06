import { GetAllUserFilterModel } from "@application/model/webeditor/user/GetAllUserFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IUserGetAll {
  executeAsync(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}

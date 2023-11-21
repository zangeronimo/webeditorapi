import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IUserGetAll {
  ExecuteAsync(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<PaginatorResultDto>;
}
import { GetAllRoleFilterModel } from "@application/model/webeditor/role/GetAllRoleFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IRoleGetAll {
  ExecuteAsync(model: GetAllRoleFilterModel): Promise<PaginatorResultDto>;
}

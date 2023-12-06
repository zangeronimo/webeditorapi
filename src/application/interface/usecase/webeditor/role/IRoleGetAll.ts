import { GetAllRoleFilterModel } from "@application/model/webeditor/role";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";

export interface IRoleGetAll {
  executeAsync(model: GetAllRoleFilterModel): Promise<PaginatorResultDto>;
}

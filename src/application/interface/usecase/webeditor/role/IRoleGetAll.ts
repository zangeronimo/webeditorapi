import { GetAllRoleFilterModel } from "@application/model/webeditor/role";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { RoleDto } from "@domain/dto/webeditor";

export interface IRoleGetAll {
  executeAsync(
    model: GetAllRoleFilterModel
  ): Promise<PaginatorResultDto<RoleDto[]>>;
}

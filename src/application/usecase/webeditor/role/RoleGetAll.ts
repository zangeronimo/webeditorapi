import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { IRoleGetAll } from "@application/interface/usecase/webeditor/role/IRoleGetAll";
import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { GetAllRoleFilterModel } from "@application/model/webeditor/role/GetAllRoleFilterModel";
import { Role } from "@domain/entity/Role";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export class RoleGetAll implements IRoleGetAll {
  constructor(readonly _roleRepository: IRoleRepository) {}

  async ExecuteAsync(model: GetAllRoleFilterModel) {
    const { itens: roles, total } = await this._roleRepository.getAll(model);

    const rolesDto = roles.map((role: Role) => new RoleDto(role));
    return new PaginatorResultDto(rolesDto, total);
  }
}

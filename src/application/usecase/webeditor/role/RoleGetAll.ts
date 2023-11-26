import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { IRoleGetAll } from "@application/interface/usecase/webeditor/role/IRoleGetAll";
import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { GetAllRoleFilterModel } from "@application/model/webeditor/role/GetAllRoleFilterModel";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { inject } from "@infra/di/Inject";
import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export class RoleGetAll implements IRoleGetAll {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;
  @inject("IRoleRepository")
  _roleRepository?: IRoleRepository;

  async ExecuteAsync(model: GetAllRoleFilterModel) {
    const { itens: roles, total } = await this._roleRepository?.getAll(model)!;

    const rolesDto = [];
    for (let i = 0; i < roles.length; i++) {
      const module = await this._moduleRepository?.getById(roles[i].moduleId);
      if (!module) {
        throw new Error("Module not found");
      }
      const roleDto = new RoleDto(roles[i], new ModuleDto(module!));
      rolesDto.push(roleDto);
    }

    return new PaginatorResultDto(rolesDto, total);
  }
}

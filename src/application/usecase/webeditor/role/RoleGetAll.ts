import {
  IModuleRepository,
  IRoleRepository,
} from "@application/interface/repository/webeditor";
import { IRoleGetAll } from "@application/interface/usecase/webeditor/role";
import { GetAllRoleFilterModel } from "@application/model/webeditor/role";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ModuleDto, RoleDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class RoleGetAll implements IRoleGetAll {
  constructor(
    @inject("IModuleRepository")
    readonly _moduleRepository: IModuleRepository,
    @inject("IRoleRepository")
    readonly _roleRepository: IRoleRepository,
  ) {}

  async executeAsync(model: GetAllRoleFilterModel) {
    const { itens: roles, total } = await this._roleRepository.getAllAsync(
      model
    )!;

    const rolesDto = [];
    for (let i = 0; i < roles.length; i++) {
      const module = await this._moduleRepository.getByIdAsync(
        roles[i].moduleId
      );
      if (!module) {
        throw new Error("Module not found");
      }
      const roleDto = new RoleDto(roles[i], new ModuleDto(module!));
      rolesDto.push(roleDto);
    }

    return new PaginatorResultDto(rolesDto, total);
  }
}

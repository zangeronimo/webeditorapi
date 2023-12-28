import {
  IModuleRepository,
  IRoleRepository,
} from "@application/interface/repository/webeditor";
import { IRoleCreate } from "@application/interface/usecase/webeditor/role";
import { Messages } from "@application/messages/Messages";
import { RoleCreateDataModel } from "@application/model/webeditor/role";
import { ModuleDto, RoleDto } from "@domain/dto/webeditor";
import { Role } from "@domain/entity/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class RoleCreate implements IRoleCreate {
  constructor(
    @inject("IModuleRepository")
    readonly _moduleRepository: IModuleRepository,
    @inject("IRoleRepository")
    readonly _roleRepository: IRoleRepository,
  ) {}

  async executeAsync(roleData: RoleCreateDataModel) {
    const roleExists = await this._roleRepository.getByNameAsync(
      roleData.name
    );
    if (roleExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const role = Role.create(roleData);
    await this._roleRepository.saveAsync(role);
    const module = await this._moduleRepository.getByIdAsync(role.moduleId);
    if (!module) {
      throw new Error(Messages.notFound("Module"));
    }
    return new RoleDto(role, new ModuleDto(module));
  }
}

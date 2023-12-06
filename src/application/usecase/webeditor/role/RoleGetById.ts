import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { IRoleGetById } from "@application/interface/usecase/webeditor/role/IRoleGetById";
import { Messages } from "@application/messages/Messages";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { inject } from "@infra/di/Inject";

export class RoleGetById implements IRoleGetById {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;
  @inject("IRoleRepository")
  _roleRepository?: IRoleRepository;

  async executeAsync(id: string) {
    const role = await this._roleRepository?.getByIdAsync(id)!;
    if (role === null) {
      throw new Error(Messages.notFound("Role"));
    }
    const module = await this._moduleRepository?.getByIdAsync(role.moduleId);
    if (!module) {
      throw new Error(Messages.notFound("Module"));
    }
    return new RoleDto(role, new ModuleDto(module!));
  }
}

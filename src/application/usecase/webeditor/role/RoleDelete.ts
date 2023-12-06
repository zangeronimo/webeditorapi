import {
  IModuleRepository,
  IRoleRepository,
} from "@application/interface/repository/webeditor";
import { IRoleDelete } from "@application/interface/usecase/webeditor/role/IRoleDelete";
import { Messages } from "@application/messages/Messages";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { inject } from "@infra/di/Inject";

export class RoleDelete implements IRoleDelete {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;
  @inject("IRoleRepository")
  _roleRepository?: IRoleRepository;

  async executeAsync(id: string) {
    const role = await this._roleRepository?.getByIdAsync(id)!;
    if (role === null) {
      throw new Error(Messages.notFound("Role"));
    }
    await this._roleRepository?.deleteAsync(role, new Date());
    const module = await this._moduleRepository?.getByIdAsync(role.moduleId);
    if (!module) {
      throw new Error(Messages.notFound("Module"));
    }
    return new RoleDto(role, new ModuleDto(module));
  }
}

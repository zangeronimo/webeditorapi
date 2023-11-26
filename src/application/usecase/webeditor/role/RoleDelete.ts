import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
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

  async ExecuteAsync(id: string) {
    const role = await this._roleRepository?.getById(id)!;
    if (role === null) {
      throw new Error(Messages.NotFound("Role"));
    }
    await this._roleRepository?.delete(role, new Date());
    const module = await this._moduleRepository?.getById(role.moduleId);
    if (!module) {
      throw new Error(Messages.NotFound("Module"));
    }
    return new RoleDto(role, new ModuleDto(module));
  }
}

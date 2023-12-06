import {
  IModuleRepository,
  IRoleRepository,
} from "@application/interface/repository/webeditor";
import { IRoleUpdate } from "@application/interface/usecase/webeditor/role";
import { Messages } from "@application/messages/Messages";
import { RoleUpdateDataModel } from "@application/model/webeditor/role";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { inject } from "@infra/di/Inject";

export class RoleUpdate implements IRoleUpdate {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;
  @inject("IRoleRepository")
  _roleRepository?: IRoleRepository;

  async executeAsync(roleData: RoleUpdateDataModel) {
    const role = await this._roleRepository?.getByIdAsync(roleData.id)!;
    if (role === null) {
      throw new Error(Messages.notFound("Role"));
    }
    if (roleData.name !== role.name) {
      const existName = await this._roleRepository?.getByNameAsync(
        roleData.name
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    role.update(roleData);
    await this._roleRepository?.updateAsync(role);
    const module = await this._moduleRepository?.getByIdAsync(role.moduleId);
    if (!module) {
      throw new Error(Messages.notFound("Module"));
    }
    return new RoleDto(role, new ModuleDto(module));
  }
}

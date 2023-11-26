import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { IRoleUpdate } from "@application/interface/usecase/webeditor/role/IRoleUpdate";
import { Messages } from "@application/messages/Messages";
import { RoleUpdateDataModel } from "@application/model/webeditor/role/RoleUpdateModel";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { inject } from "@infra/di/Inject";

export class RoleUpdate implements IRoleUpdate {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;
  @inject("IRoleRepository")
  _roleRepository?: IRoleRepository;

  async ExecuteAsync(roleData: RoleUpdateDataModel) {
    const role = await this._roleRepository?.getById(roleData.id)!;
    if (role === null) {
      throw new Error(Messages.NotFound("Role"));
    }
    if (roleData.name !== role.name) {
      const existName = await this._roleRepository?.getByName(roleData.name);
      if (existName !== null) {
        throw new Error(Messages.AlreadyInUse("Name"));
      }
    }
    await role.Update(roleData);
    await this._roleRepository?.update(role);
    const module = await this._moduleRepository?.getById(role.moduleId);
    if (!module) {
      throw new Error(Messages.NotFound("Module"));
    }
    return new RoleDto(role, new ModuleDto(module));
  }
}

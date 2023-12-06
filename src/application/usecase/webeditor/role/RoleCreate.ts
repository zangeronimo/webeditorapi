import {
  IModuleRepository,
  IRoleRepository,
} from "@application/interface/repository/webeditor";
import { IRoleCreate } from "@application/interface/usecase/webeditor/role";
import { Messages } from "@application/messages/Messages";
import { RoleCreateDataModel } from "@application/model/webeditor/role";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { Role } from "@domain/entity/webeditor/Role";
import { inject } from "@infra/di/Inject";

export class RoleCreate implements IRoleCreate {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;
  @inject("IRoleRepository")
  _roleRepository?: IRoleRepository;

  async executeAsync(roleData: RoleCreateDataModel) {
    const roleExists = await this._roleRepository?.getByNameAsync(
      roleData.name
    );
    if (roleExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const role = Role.create(roleData);
    await this._roleRepository?.saveAsync(role);
    const module = await this._moduleRepository?.getByIdAsync(role.moduleId);
    if (!module) {
      throw new Error(Messages.notFound("Module"));
    }
    return new RoleDto(role, new ModuleDto(module));
  }
}

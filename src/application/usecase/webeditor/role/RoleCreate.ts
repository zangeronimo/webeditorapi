import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { IRoleCreate } from "@application/interface/usecase/webeditor/role/IRoleCreate";
import { Messages } from "@application/messages/Messages";
import { RoleCreateDataModel } from "@application/model/webeditor/role/RoleCreateModel";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { Role } from "@domain/entity/webeditor/Role";

export class RoleCreate implements IRoleCreate {
  constructor(readonly _roleRepository: IRoleRepository) {}

  async ExecuteAsync(roleData: RoleCreateDataModel) {
    const roleExists = await this._roleRepository.getByName(roleData.name);
    if (roleExists !== null) {
      throw new Error(Messages.AlreadyInUse("Name"));
    }
    const role = await Role.Create(roleData);
    await this._roleRepository.save(role);
    return new RoleDto(role);
  }
}

import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { IRoleUpdate } from "@application/interface/usecase/webeditor/role/IRoleUpdate";
import { Messages } from "@application/messages/Messages";
import { RoleUpdateDataModel } from "@application/model/webeditor/role/RoleUpdateModel";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export class RoleUpdate implements IRoleUpdate {
  constructor(readonly _roleRepository: IRoleRepository) {}

  async ExecuteAsync(roleData: RoleUpdateDataModel) {
    const role = await this._roleRepository.getById(roleData.id);
    if (role === null) {
      throw new Error(Messages.NotFound("Role"));
    }
    if (roleData.name !== role.name) {
      const existName = await this._roleRepository.getByName(roleData.name);
      if (existName !== null) {
        throw new Error(Messages.AlreadyInUse("Name"));
      }
    }
    await role.Update(roleData);
    await this._roleRepository.update(role);
    return new RoleDto(role);
  }
}

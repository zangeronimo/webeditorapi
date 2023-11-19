import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { IRoleDelete } from "@application/interface/usercase/webeditor/role/IRoleDelete";
import { Messages } from "@application/messages/Messages";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export class RoleDelete implements IRoleDelete {
  constructor(readonly _roleRepository: IRoleRepository) {}

  async ExecuteAsync(id: string) {
    const role = await this._roleRepository.getById(id);
    if (role === null) {
      throw new Error(Messages.NotFound("Role"));
    }
    await this._roleRepository.delete(role, new Date());
    return new RoleDto(role);
  }
}

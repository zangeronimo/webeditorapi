import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IRoleGetById } from "@application/interface/usercase/webeditor/role/IRoleGetById";
import { IUserGetById } from "@application/interface/usercase/webeditor/user/IUserGetById";
import { Messages } from "@application/messages/Messages";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { UserDto } from "@domain/dto/webeditor/UserDto";

export class RoleGetById implements IRoleGetById {
  constructor(readonly _roleRepository: IRoleRepository) {}

  async ExecuteAsync(id: string) {
    const role = await this._roleRepository.getById(id);
    if (role === null) {
      throw new Error(Messages.NotFound("Role"));
    }
    return new RoleDto(role);
  }
}

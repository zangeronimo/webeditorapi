import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IUserGetById } from "@application/interface/usercase/webeditor/user/IUserGetById";
import { Messages } from "@application/messages/Messages";
import { UserDto } from "@domain/dto/webeditor/UserDto";

export class UserGetById implements IUserGetById {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(id: string, company: string) {
    const user = await this._userRepository.getById(id, company);
    if (user === null) {
      throw new Error(Messages.NotFound("User"));
    }
    return new UserDto(user);
  }
}

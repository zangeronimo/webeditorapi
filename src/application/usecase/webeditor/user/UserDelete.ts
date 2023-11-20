import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IUserDelete } from "@application/interface/usecase/webeditor/user/IUserDelete";
import { Messages } from "@application/messages/Messages";
import { UserDto } from "@domain/dto/webeditor/UserDto";

export class UserDelete implements IUserDelete {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(id: string, company: string) {
    const user = await this._userRepository.getById(id, company);
    if (user === null) {
      throw new Error(Messages.NotFound("User"));
    }
    await this._userRepository.delete(user, new Date());
    return new UserDto(user);
  }
}

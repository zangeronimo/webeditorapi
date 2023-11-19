import { IUserRepository } from "@application/interface/repository/IUserRepository";
import { IUserDelete } from "@application/interface/usercase/IUserDelete";
import { Messages } from "@application/messages/Messages";
import { UserDto } from "@domain/dto/UserDto";

export class UserDelete implements IUserDelete {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(id: string, company: string) {
    const user = await this._userRepository.getById(id, company);
    if (user === null) {
      throw new Error(Messages.UserNotFound);
    }
    await this._userRepository.delete(user, new Date());
    return new UserDto(user);
  }
}

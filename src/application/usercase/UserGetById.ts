import { IUserRepository } from "@application/interface/repository/IUserRepository";
import { IUserGetById } from "@application/interface/usercase/IUserGetById";
import { Messages } from "@application/messages/Messages";
import { UserDto } from "@domain/entity/dto/UserDto";

export class UserGetById implements IUserGetById {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(id: string, company: string) {
    const user = await this._userRepository.getById(id, company);
    if (user === null) {
      throw new Error(Messages.UserNotFound);
    }
    return new UserDto(user);
  }
}

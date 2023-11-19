import { IUserRepository } from "@application/interface/repository/IUserRepository";
import { IUserUpdate } from "@application/interface/usercase/IUserUpdate";
import { Messages } from "@application/messages/Messages";
import { UserUpdateDataModel } from "@application/model/UserUpdateModel";
import { UserDto } from "@domain/entity/dto/UserDto";

export class UserUpdate implements IUserUpdate {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(userData: UserUpdateDataModel, company: string) {
    const user = await this._userRepository.getById(userData.id, company);
    if (user === null) {
      throw new Error(Messages.UserNotFound);
    }
    if (userData.email !== user.email) {
      const existEmail = await this._userRepository.getByEmail(userData.email);
      if (existEmail !== null) {
        throw new Error(Messages.EmailAlreadyUsed);
      }
    }
    await user.Update(userData);
    await this._userRepository.update(user);
    return new UserDto(user);
  }
}

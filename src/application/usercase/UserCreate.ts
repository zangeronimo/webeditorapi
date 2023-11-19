import { IUserRepository } from "@application/interface/repository/IUserRepository";
import { IUserCreate } from "@application/interface/usercase/IUserCreate";
import { Messages } from "@application/messages/Messages";
import { UserCreateDataModel } from "@application/model/UserCreateModel";
import { User } from "@domain/entity/User";
import { UserDto } from "@domain/dto/UserDto";

export class UserCreate implements IUserCreate {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(userData: UserCreateDataModel, company: string) {
    const emailExists = await this._userRepository.getByEmail(userData.email);
    if (emailExists !== null) {
      throw new Error(Messages.EmailAlreadyInUse);
    }
    const user = await User.Create(
      userData.name,
      userData.email,
      userData.password,
      company
    );
    await this._userRepository.save(user);
    return new UserDto(user);
  }
}

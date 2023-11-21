import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IUserCreate } from "@application/interface/usecase/webeditor/user/IUserCreate";
import { Messages } from "@application/messages/Messages";
import { UserCreateDataModel } from "@application/model/webeditor/user/UserCreateModel";
import { UserDto } from "@domain/dto/webeditor/UserDto";
import { User } from "@domain/entity/webeditor/User";

export class UserCreate implements IUserCreate {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(userData: UserCreateDataModel, company: string) {
    const emailExists = await this._userRepository.getByEmail(userData.email);
    if (emailExists !== null) {
      throw new Error(Messages.AlreadyInUse("Email"));
    }
    const user = await User.Create(userData, company);
    await this._userRepository.save(user);
    return new UserDto(user);
  }
}

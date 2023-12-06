import { IUserRepository } from "@application/interface/repository/webeditor";
import { IUserCreate } from "@application/interface/usecase/webeditor/user";
import { Messages } from "@application/messages/Messages";
import { UserCreateDataModel } from "@application/model/webeditor/user";
import { UserDto } from "@domain/dto/webeditor/UserDto";
import { User } from "@domain/entity/webeditor/User";
import { inject } from "@infra/di/Inject";

export class UserCreate implements IUserCreate {
  @inject("IUserRepository")
  _userRepository?: IUserRepository;

  async executeAsync(userData: UserCreateDataModel, company: string) {
    const emailExists = await this._userRepository?.getByEmailAsync(
      userData.email
    );
    if (emailExists !== null) {
      throw new Error(Messages.alreadyInUse("Email"));
    }
    const user = await User.create(userData, company);
    await this._userRepository?.saveAsync(user);
    return new UserDto(user);
  }
}

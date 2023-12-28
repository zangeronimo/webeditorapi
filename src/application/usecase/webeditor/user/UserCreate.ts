import { IUserRepository } from "@application/interface/repository/webeditor";
import { IUserCreate } from "@application/interface/usecase/webeditor/user";
import { Messages } from "@application/messages/Messages";
import { UserCreateDataModel } from "@application/model/webeditor/user";
import { UserDto } from "@domain/dto/webeditor";
import { User } from "@domain/entity/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserCreate implements IUserCreate {
  constructor(
    @inject("IUserRepository")
    readonly _userRepository: IUserRepository,
  ) {}

  async executeAsync(userData: UserCreateDataModel, company: string) {
    const emailExists = await this._userRepository.getByEmailAsync(
      userData.email
    );
    if (emailExists !== null) {
      throw new Error(Messages.alreadyInUse("Email"));
    }
    const user = await User.createAsync(userData, company);
    await this._userRepository.saveAsync(user);
    return new UserDto(user);
  }
}

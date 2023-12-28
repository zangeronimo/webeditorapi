import { IUserRepository } from "@application/interface/repository/webeditor";
import { IUserUpdate } from "@application/interface/usecase/webeditor/user";
import { Messages } from "@application/messages/Messages";
import { UserUpdateDataModel } from "@application/model/webeditor/user";
import { UserDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserUpdate implements IUserUpdate {
  constructor(
    @inject("IUserRepository")
    readonly _userRepository: IUserRepository,
  ) {}

  async executeAsync(userData: UserUpdateDataModel, company: string) {
    const user = await this._userRepository.getByIdAsync(
      userData.id,
      company
    )!;
    if (user === null) {
      throw new Error(Messages.notFound("User"));
    }
    if (userData.email !== user.email) {
      const existEmail = await this._userRepository.getByEmailAsync(
        userData.email
      );
      if (existEmail !== null) {
        throw new Error(Messages.alreadyInUse("Email"));
      }
    }
    await user.updateAsync(userData);
    await this._userRepository.updateAsync(user);
    return new UserDto(user);
  }
}

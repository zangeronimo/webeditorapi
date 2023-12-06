import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IUserGetById } from "@application/interface/usecase/webeditor/user/IUserGetById";
import { Messages } from "@application/messages/Messages";
import { UserDto } from "@domain/dto/webeditor/UserDto";
import { inject } from "@infra/di/Inject";

export class UserGetById implements IUserGetById {
  @inject("IUserRepository")
  _userRepository?: IUserRepository;

  async executeAsync(id: string, company: string) {
    const user = await this._userRepository?.getByIdAsync(id, company)!;
    if (user === null) {
      throw new Error(Messages.notFound("User"));
    }
    return new UserDto(user);
  }
}

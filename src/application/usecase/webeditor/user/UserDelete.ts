import { IUserRepository } from "@application/interface/repository/webeditor";
import { IUserDelete } from "@application/interface/usecase/webeditor/user";
import { Messages } from "@application/messages/Messages";
import { UserDto } from "@domain/dto/webeditor/UserDto";
import { inject } from "@infra/di/Inject";

export class UserDelete implements IUserDelete {
  @inject("IUserRepository")
  _userRepository?: IUserRepository;

  async executeAsync(id: string, company: string) {
    const user = await this._userRepository?.getByIdAsync(id, company)!;
    if (user === null) {
      throw new Error(Messages.notFound("User"));
    }
    await this._userRepository?.deleteAsync(user, new Date());
    return new UserDto(user);
  }
}

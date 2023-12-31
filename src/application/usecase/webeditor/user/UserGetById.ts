import { IUserRepository } from "@application/interface/repository/webeditor";
import { IUserGetById } from "@application/interface/usecase/webeditor/user";
import { Messages } from "@application/messages/Messages";
import { UserDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserGetById implements IUserGetById {
  constructor(
    @inject("IUserRepository")
    readonly _userRepository: IUserRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const user = await this._userRepository.getByIdAsync(id, company)!;
    if (user === null) {
      throw new Error(Messages.notFound("User"));
    }
    return new UserDto(user);
  }
}

import { ITokenProvider } from "@application/interface/provider/ITokenProvider";
import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IMakeLogin } from "@application/interface/usercase/webeditor/IMakeLogin";
import { Messages } from "@application/messages/Messages";
import { AuthDto } from "@domain/dto/webeditor/AuthDto";
import { inject } from "@infra/di/Inject";

export class MakeLogin implements IMakeLogin {
  @inject("ITokenProvider")
  _tokenProvider?: ITokenProvider;

  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(email: string, password: string) {
    const user = await this._userRepository.getByEmail(email);
    if (user === null) {
      throw new Error(Messages.InvalidUsernameOrPassword);
    }
    if ((await user.CheckPassword(password)) === false) {
      throw new Error(Messages.InvalidUsernameOrPassword);
    }

    const token = this._tokenProvider?.Generate(user, new Date());
    return new AuthDto(token!);
  }
}

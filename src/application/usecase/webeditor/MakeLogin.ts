import { ITokenProvider } from "@application/interface/provider/ITokenProvider";
import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IMakeLogin } from "@application/interface/usecase/webeditor/IMakeLogin";
import { Messages } from "@application/messages/Messages";
import { AuthDto } from "@domain/dto/webeditor/AuthDto";
import { inject } from "@infra/di/Inject";

export class MakeLogin implements IMakeLogin {
  @inject("ITokenProvider")
  _tokenProvider?: ITokenProvider;
  @inject("IUserRepository")
  _userRepository?: IUserRepository;

  async ExecuteAsync(email: string, password: string) {
    const user = await this._userRepository?.getByEmail(email)!;
    if (user === null) {
      throw new Error(Messages.InvalidUsernameOrPassword);
    }
    if ((await user.CheckPassword(password)) === false) {
      throw new Error(Messages.InvalidUsernameOrPassword);
    }
    const dateNow = new Date();
    const token = this._tokenProvider?.Generate(
      user,
      dateNow,
      dateNow.getTime() + 15000
    );
    const refreshToken = this._tokenProvider?.Generate(
      user,
      dateNow,
      dateNow.getTime() + 3600000
    );
    return { token: new AuthDto(token!), refreshToken: refreshToken! };
  }
}

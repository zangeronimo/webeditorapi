import { ITokenProvider } from "@application/interface/provider";
import { IUserRepository } from "@application/interface/repository/webeditor";
import { IMakeLogin } from "@application/interface/usecase/webeditor";
import { Messages } from "@application/messages/Messages";
import { AuthDto } from "@domain/dto/webeditor/AuthDto";
import { inject } from "@infra/di/Inject";

export class MakeLogin implements IMakeLogin {
  @inject("ITokenProvider")
  _tokenProvider?: ITokenProvider;
  @inject("IUserRepository")
  _userRepository?: IUserRepository;

  async executeAsync(email: string, password: string) {
    const user = await this._userRepository?.getByEmailAsync(email)!;
    if (user === null) {
      throw new Error(Messages.invalidUsernameOrPassword);
    }
    if ((await user.checkPasswordAsync(password)) === false) {
      throw new Error(Messages.invalidUsernameOrPassword);
    }
    const dateNow = new Date();
    const token = this._tokenProvider?.generate(
      user,
      dateNow,
      dateNow.getTime() + 15000
    );
    const refreshToken = this._tokenProvider?.generate(
      user,
      dateNow,
      dateNow.getTime() + 3600000
    );
    return { token: new AuthDto(token!), refreshToken: refreshToken! };
  }
}

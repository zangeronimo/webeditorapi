import { ITokenProvider } from "@application/interface/provider/ITokenProvider";
import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IRefreshToken } from "@application/interface/usecase/webeditor/IRefreshToken";
import { Messages } from "@application/messages/Messages";
import { AuthDto } from "@domain/dto/webeditor/AuthDto";
import { inject } from "@infra/di/Inject";

export class RefreshToken implements IRefreshToken {
  @inject("ITokenProvider")
  _tokenProvider?: ITokenProvider;
  @inject("IUserRepository")
  _userRepository?: IUserRepository;

  async executeAsync(refresh: string) {
    const payload = this._tokenProvider?.verify(refresh);
    if (!payload) {
      throw new Error(Messages.invalidUsernameOrPassword);
    }
    const user = await this._userRepository?.getByIdAsync(
      payload.sub,
      payload.company
    )!;
    if (user === null) {
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

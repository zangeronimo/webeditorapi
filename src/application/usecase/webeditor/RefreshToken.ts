import { ITokenProvider } from "@application/interface/provider";
import { IUserRepository } from "@application/interface/repository/webeditor";
import { IRefreshToken } from "@application/interface/usecase/webeditor";
import { Messages } from "@application/messages/Messages";
import { AuthDto } from "@domain/dto/webeditor";
import { injectable, inject } from "tsyringe";

@injectable()
export class RefreshToken implements IRefreshToken {
  constructor(
    @inject("ITokenProvider")
    readonly _tokenProvider: ITokenProvider,
    @inject("IUserRepository")
    readonly _userRepository: IUserRepository,
  ) {}

  async executeAsync(refresh: string) {
    const payload = this._tokenProvider.verify(refresh);
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
    const token = this._tokenProvider.generate(
      user,
      dateNow,
      dateNow.getTime() + +process.env.TOKEN_EXP!
    );
    const refreshToken = this._tokenProvider.generate(
      user,
      dateNow,
      dateNow.getTime() + +process.env.REFRESH_EXP!
    );
    return { token: new AuthDto(token!), refreshToken: refreshToken! };
  }
}

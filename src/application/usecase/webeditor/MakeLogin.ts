import { ITokenProvider } from "@application/interface/provider";
import { IUserRepository } from "@application/interface/repository/webeditor";
import { IMakeLogin } from "@application/interface/usecase/webeditor";
import { Messages } from "@application/messages/Messages";
import { AuthDto, UserDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class MakeLogin implements IMakeLogin {
  constructor(
    @inject("ITokenProvider")
    readonly _tokenProvider: ITokenProvider,
    @inject("IUserRepository")
    readonly _userRepository: IUserRepository
  ) {}

  async executeAsync(email: string, password: string) {
    const user = await this._userRepository.getByEmailAsync(email)!;
    if (user === null) {
      throw new Error(Messages.invalidUsernameOrPassword);
    }
    if (user.password.validate(password) === false) {
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
    return {
      user: new UserDto(user),
      token: new AuthDto(token!),
      refreshToken,
    };
  }
}

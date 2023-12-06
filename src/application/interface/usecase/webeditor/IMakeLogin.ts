import { AuthDto } from "@domain/dto/webeditor";

export interface IMakeLogin {
  executeAsync(
    email: string,
    password: string
  ): Promise<{ token: AuthDto; refreshToken: string }>;
}

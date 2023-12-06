import { AuthDto } from "@domain/dto/webeditor/AuthDto";

export interface IMakeLogin {
  executeAsync(
    email: string,
    password: string
  ): Promise<{ token: AuthDto; refreshToken: string }>;
}

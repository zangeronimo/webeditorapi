import { AuthDto } from "@domain/dto/webeditor/AuthDto";

export interface IRefreshToken {
  executeAsync(
    refresh: string
  ): Promise<{ token: AuthDto; refreshToken: string }>;
}

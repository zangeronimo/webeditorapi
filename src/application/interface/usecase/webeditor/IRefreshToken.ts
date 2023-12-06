import { AuthDto } from "@domain/dto/webeditor";

export interface IRefreshToken {
  executeAsync(
    refresh: string
  ): Promise<{ token: AuthDto; refreshToken: string }>;
}

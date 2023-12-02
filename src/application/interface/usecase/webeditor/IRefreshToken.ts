import { AuthDto } from "@domain/dto/webeditor/AuthDto";

export interface IRefreshToken {
  ExecuteAsync(
    refresh: string
  ): Promise<{ token: AuthDto; refreshToken: string }>;
}

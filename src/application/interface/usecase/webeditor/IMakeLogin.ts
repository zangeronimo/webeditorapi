import { AuthDto } from "@domain/dto/webeditor/AuthDto";

export interface IMakeLogin {
  ExecuteAsync(email: string, password: string): Promise<AuthDto>;
}

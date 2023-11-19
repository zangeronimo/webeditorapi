import { AuthDto } from "@domain/dto/AuthDto";

export interface IMakeLogin {
  ExecuteAsync(email: string, password: string): Promise<AuthDto>;
}

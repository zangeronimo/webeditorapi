import { AuthDto } from "@domain/entity/dto/AuthDto";

export interface IMakeLogin {
  ExecuteAsync(email: string, password: string): Promise<AuthDto>;
}

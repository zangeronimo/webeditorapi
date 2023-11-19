import { UserDto } from "@domain/dto/UserDto";

export interface IUserDelete {
  ExecuteAsync(id: string, company: string): Promise<UserDto>;
}

import { UserDto } from "@domain/dto/UserDto";

export interface IUserGetById {
  ExecuteAsync(id: string, company: string): Promise<UserDto>;
}

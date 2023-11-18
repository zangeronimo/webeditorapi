import { UserDto } from "@domain/entity/dto/UserDto";

export interface IUserGetAll {
  ExecuteAsync(company: string): Promise<UserDto[]>;
}

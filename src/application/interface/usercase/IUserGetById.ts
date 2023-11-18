import { UserDto } from "@domain/entity/dto/UserDto";

export interface IUserGetById {
  ExecuteAsync(id: string, company: string): Promise<UserDto>;
}

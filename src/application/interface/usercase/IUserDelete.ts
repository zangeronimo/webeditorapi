import { UserDto } from "@domain/entity/dto/UserDto";

export interface IUserDelete {
  ExecuteAsync(id: string, company: string): Promise<UserDto>;
}

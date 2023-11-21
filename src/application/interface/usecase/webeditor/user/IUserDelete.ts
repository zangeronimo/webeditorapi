import { UserDto } from "@domain/dto/webeditor/UserDto";

export interface IUserDelete {
  ExecuteAsync(id: string, company: string): Promise<UserDto>;
}

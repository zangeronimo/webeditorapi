import { UserDto } from "@domain/dto/webeditor/UserDto";

export interface IUserGetById {
  ExecuteAsync(id: string, company: string): Promise<UserDto>;
}

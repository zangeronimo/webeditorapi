import { UserDto } from "@domain/dto/webeditor/UserDto";

export interface IUserGetById {
  executeAsync(id: string, company: string): Promise<UserDto>;
}

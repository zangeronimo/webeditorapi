import { UserDto } from "@domain/dto/webeditor/UserDto";

export interface IUserDelete {
  executeAsync(id: string, company: string): Promise<UserDto>;
}

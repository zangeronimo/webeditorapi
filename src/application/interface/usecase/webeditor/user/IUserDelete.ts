import { UserDto } from "@domain/dto/webeditor";

export interface IUserDelete {
  executeAsync(id: string, company: string): Promise<UserDto>;
}

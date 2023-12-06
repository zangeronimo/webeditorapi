import { UserDto } from "@domain/dto/webeditor";

export interface IUserGetById {
  executeAsync(id: string, company: string): Promise<UserDto>;
}

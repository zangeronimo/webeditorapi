import { UserUpdateDataModel } from "@application/model/webeditor/user";
import { UserDto } from "@domain/dto/webeditor";

export interface IUserUpdate {
  executeAsync(
    userData: UserUpdateDataModel,
    company: string
  ): Promise<UserDto>;
}

import { UserUpdateDataModel } from "@application/model/webeditor/user/UserUpdateModel";
import { UserDto } from "@domain/dto/webeditor/UserDto";

export interface IUserUpdate {
  ExecuteAsync(
    userData: UserUpdateDataModel,
    company: string
  ): Promise<UserDto>;
}

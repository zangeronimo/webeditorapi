import { UserCreateDataModel } from "@application/model/webeditor/user/UserCreateModel";
import { UserDto } from "@domain/dto/webeditor/UserDto";

export interface IUserCreate {
  ExecuteAsync(
    userData: UserCreateDataModel,
    company: string
  ): Promise<UserDto>;
}

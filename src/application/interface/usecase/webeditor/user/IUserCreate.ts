import { UserCreateDataModel } from "@application/model/webeditor/user/UserCreateModel";
import { UserDto } from "@domain/dto/webeditor/UserDto";

export interface IUserCreate {
  executeAsync(
    userData: UserCreateDataModel,
    company: string
  ): Promise<UserDto>;
}

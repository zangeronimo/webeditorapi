import { UserCreateDataModel } from "@application/model/webeditor/user";
import { UserDto } from "@domain/dto/webeditor";

export interface IUserCreate {
  executeAsync(
    userData: UserCreateDataModel,
    company: string
  ): Promise<UserDto>;
}

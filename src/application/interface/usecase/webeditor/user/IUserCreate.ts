import { UserCreateDataModel } from "@application/model/UserCreateModel";
import { UserDto } from "@domain/dto/UserDto";

export interface IUserCreate {
  ExecuteAsync(
    userData: UserCreateDataModel,
    company: string
  ): Promise<UserDto>;
}

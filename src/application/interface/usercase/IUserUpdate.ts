import { UserUpdateDataModel } from "@application/model/UserUpdateModel";
import { UserDto } from "@domain/entity/dto/UserDto";

export interface IUserUpdate {
  ExecuteAsync(
    userData: UserUpdateDataModel,
    company: string
  ): Promise<UserDto>;
}

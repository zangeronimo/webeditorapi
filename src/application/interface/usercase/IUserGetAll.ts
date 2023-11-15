import { AuthDto } from "@domain/entity/dto/AuthDto";
import { UserDto } from "@domain/entity/dto/UserDto";

export interface IUserGetAll {
  ExecuteAsync(): Promise<UserDto[]>;
}

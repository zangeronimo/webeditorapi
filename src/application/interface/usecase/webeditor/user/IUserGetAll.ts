import { GetAllUserFilterModel } from "@application/model/webeditor/user";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { UserDto } from "@domain/dto/webeditor";

export interface IUserGetAll {
  executeAsync(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<PaginatorResultDto<UserDto[]>>;
}

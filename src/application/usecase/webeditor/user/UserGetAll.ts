import { IUserRepository } from "@application/interface/repository/webeditor";
import { IUserGetAll } from "@application/interface/usecase/webeditor/user";
import { GetAllUserFilterModel } from "@application/model/webeditor/user";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { UserDto } from "@domain/dto/webeditor";
import { User } from "@domain/entity/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserGetAll implements IUserGetAll {
  constructor(
    @inject("IUserRepository")
    readonly _userRepository: IUserRepository,
  ) {}

  async executeAsync(model: GetAllUserFilterModel, company: string) {
    const { itens: users, total } = await this._userRepository.getAllAsync(
      model,
      company
    )!;

    const usersDto = users.map((user: User) => new UserDto(user));
    return new PaginatorResultDto(usersDto, total);
  }
}

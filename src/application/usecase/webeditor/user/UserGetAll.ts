import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IUserGetAll } from "@application/interface/usecase/webeditor/user/IUserGetAll";
import { GetAllUserFilterModel } from "@application/model/webeditor/user/GetAllUserFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { UserDto } from "@domain/dto/webeditor/UserDto";
import { User } from "@domain/entity/webeditor/User";

export class UserGetAll implements IUserGetAll {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(model: GetAllUserFilterModel, company: string) {
    const { itens: users, total } = await this._userRepository.getAll(
      model,
      company
    );

    const usersDto = users.map((user: User) => new UserDto(user));
    return new PaginatorResultDto(usersDto, total);
  }
}

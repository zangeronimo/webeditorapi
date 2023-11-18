import { IUserRepository } from "@application/interface/repository/IUserRepository";
import { IUserGetAll } from "@application/interface/usercase/IUserGetAll";
import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { User } from "@domain/entity/User";
import { PaginatorResultDto } from "@domain/entity/dto/PaginatorResultDto";
import { UserDto } from "@domain/entity/dto/UserDto";

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

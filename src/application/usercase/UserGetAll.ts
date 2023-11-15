import { IUserRepository } from "@application/interface/repository/UserRepository";
import { IUserGetAll } from "@application/interface/usercase/IUserGetAll";
import { User } from "@domain/entity/User";
import { UserDto } from "@domain/entity/dto/UserDto";

export class UserGetAll implements IUserGetAll {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync() {
    const users = await this._userRepository.getAll();

    const usersDto = users.map((user: User) => new UserDto(user));
    return usersDto;
  }
}

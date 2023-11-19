import { IUserRepository } from "@application/interface/repository/webeditor/IUserRepository";
import { IHasRole } from "@application/interface/usercase/webeditor/IHasRole";

export class HasRole implements IHasRole {
  constructor(readonly _userRepository: IUserRepository) {}

  async ExecuteAsync(userId: string, companyId: string, role: string) {
    const user = await this._userRepository.getById(userId, companyId);
    if (user === null) {
      return false;
    }
    return !!user.roles.find((userRole) => userRole.name === role);
  }
}

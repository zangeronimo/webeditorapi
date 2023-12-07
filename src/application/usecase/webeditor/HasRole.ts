import { IUserRepository } from "@application/interface/repository/webeditor";
import { IHasRole } from "@application/interface/usecase/webeditor";
import { inject } from "@infra/di";

export class HasRole implements IHasRole {
  @inject("IUserRepository")
  _userRepository?: IUserRepository;

  async executeAsync(userId: string, companyId: string, role: string) {
    const user = await this._userRepository?.getByIdAsync(userId, companyId)!;
    if (user === null) {
      return false;
    }
    return !!user.roles.find((userRole) => userRole.name === role);
  }
}

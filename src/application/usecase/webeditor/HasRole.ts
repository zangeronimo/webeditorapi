import { IUserRepository } from "@application/interface/repository/webeditor";
import { IHasRole } from "@application/interface/usecase/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class HasRole implements IHasRole {
  constructor(
    @inject("IUserRepository")
    readonly _userRepository: IUserRepository
  ) {}

  async executeAsync(userId: string, companyId: string, role: string) {
    const user = await this._userRepository.getByIdAsync(userId, companyId)!;
    if (user === null) {
      return false;
    }
    return !!user.roles.find((userRole) => userRole.name === role);
  }
}

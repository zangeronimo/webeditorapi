import {
  IModuleRepository,
  IRoleRepository,
} from "@application/interface/repository/webeditor";
import { IRoleGetById } from "@application/interface/usecase/webeditor/role";
import { Messages } from "@application/messages/Messages";
import { ModuleDto, RoleDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class RoleGetById implements IRoleGetById {
  constructor(
    @inject("IModuleRepository")
    readonly _moduleRepository: IModuleRepository,
    @inject("IRoleRepository")
    readonly _roleRepository: IRoleRepository,
  ) {}

  async executeAsync(id: string) {
    const role = await this._roleRepository.getByIdAsync(id)!;
    if (role === null) {
      throw new Error(Messages.notFound("Role"));
    }
    const module = await this._moduleRepository.getByIdAsync(role.moduleId);
    if (!module) {
      throw new Error(Messages.notFound("Module"));
    }
    return new RoleDto(role, new ModuleDto(module!));
  }
}

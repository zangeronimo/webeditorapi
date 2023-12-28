import {
  IModuleRepository,
  IRoleRepository,
} from "@application/interface/repository/webeditor";
import { IModuleGetAllByCompany } from "@application/interface/usecase/webeditor/module";
import { ModuleAndRoleForCompanyDto, RoleDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class ModuleGetAllByCompany implements IModuleGetAllByCompany {
  constructor(
    @inject("IModuleRepository")
    readonly _moduleRepository: IModuleRepository,
    @inject("IRoleRepository")
    readonly _roleRepository: IRoleRepository,
  ) {}

  async executeAsync(companyId: string) {
    const modules = await this._moduleRepository.getAllByCompanyAsync(
      companyId
    )!;
    const modulesDto = [];
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const roles = await this._roleRepository.getAllByModuleAsync(module.id)!;
      const dto = new ModuleAndRoleForCompanyDto();
      dto.id = module.id;
      dto.name = module.name;
      dto.roles = roles?.map((role) => new RoleDto(role));
      modulesDto.push(dto);
    }
    return modulesDto;
  }
}

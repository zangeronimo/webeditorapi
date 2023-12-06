import {
  IModuleRepository,
  IRoleRepository,
} from "@application/interface/repository/webeditor";
import { IModuleGetAllByCompany } from "@application/interface/usecase/webeditor/module/IModuleGetAllByCompany";
import { ModuleAndRoleForCompanyDto } from "@domain/dto/webeditor/ModuleAndRoleForCompanyDto";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { inject } from "@infra/di/Inject";

export class ModuleGetAllByCompany implements IModuleGetAllByCompany {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;
  @inject("IRoleRepository")
  _roleRepository?: IRoleRepository;

  async executeAsync(companyId: string) {
    const modules = await this._moduleRepository?.getAllByCompanyAsync(
      companyId
    )!;
    const modulesDto = [];
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const roles = await this._roleRepository?.getAllByModuleAsync(module.id)!;
      const dto = new ModuleAndRoleForCompanyDto();
      dto.id = module.id;
      dto.name = module.name;
      dto.roles = roles?.map((role) => new RoleDto(role));
      modulesDto.push(dto);
    }
    return modulesDto;
  }
}

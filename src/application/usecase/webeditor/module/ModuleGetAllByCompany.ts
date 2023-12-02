import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { IModuleGetAllByCompany } from "@application/interface/usecase/webeditor/module/IModuleGetAllByCompany";
import { ModuleAndRoleForCompanyDto } from "@domain/dto/webeditor/ModuleAndRoleForCompanyDto";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";
import { inject } from "@infra/di/Inject";

export class ModuleGetAllByCompany implements IModuleGetAllByCompany {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;
  @inject("IRoleRepository")
  _roleRepository?: IRoleRepository;

  async ExecuteAsync(companyId: string) {
    const modules = await this._moduleRepository?.getAllByCompany(companyId)!;
    const modulesDto = [];
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const roles = await this._roleRepository?.getAllByModule(module.id)!;
      const dto = new ModuleAndRoleForCompanyDto();
      dto.Id = module.id;
      dto.Name = module.name;
      dto.Roles = roles?.map((role) => new RoleDto(role));
      modulesDto.push(dto);
    }
    return modulesDto;
  }
}

import { ModuleAndRoleForCompanyDto } from "@domain/dto/webeditor/ModuleAndRoleForCompanyDto";

export interface IModuleGetAllByCompany {
  ExecuteAsync(companyId: string): Promise<ModuleAndRoleForCompanyDto[]>;
}

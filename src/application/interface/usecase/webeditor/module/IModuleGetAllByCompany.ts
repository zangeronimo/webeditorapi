import { ModuleAndRoleForCompanyDto } from "@domain/dto/webeditor/ModuleAndRoleForCompanyDto";

export interface IModuleGetAllByCompany {
  executeAsync(companyId: string): Promise<ModuleAndRoleForCompanyDto[]>;
}

import { ModuleAndRoleForCompanyDto } from "@domain/dto/webeditor";

export interface IModuleGetAllByCompany {
  executeAsync(companyId: string): Promise<ModuleAndRoleForCompanyDto[]>;
}

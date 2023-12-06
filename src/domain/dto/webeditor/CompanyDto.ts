import { Company } from "@domain/entity/webeditor";
import { ModuleDto } from "./ModuleDto";

export class CompanyDto {
  id: string;
  name: string;
  modules: ModuleDto[];

  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.modules = company.modules.map((module) => new ModuleDto(module));
  }
}

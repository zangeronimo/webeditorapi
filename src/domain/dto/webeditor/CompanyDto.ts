import { Company } from "@domain/entity/webeditor/Company";
import { ModuleDto } from "./ModuleDto";

export class CompanyDto {
  public Id: string;
  public Name: string;
  public Modules: ModuleDto[];

  constructor(company: Company) {
    this.Id = company.id;
    this.Name = company.name;
    this.Modules = company.modules.map((module) => new ModuleDto(module));
  }
}

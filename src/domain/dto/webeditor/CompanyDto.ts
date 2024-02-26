import { Company } from "@domain/entity/webeditor";
import { DtoBase } from "../DtoBase";
import { ModuleDto } from "./ModuleDto";

export class CompanyDto extends DtoBase {
  name: string;
  modules: ModuleDto[];

  constructor(company: Company) {
    super(company.id, company.createdAt, company.updatedAt);
    this.name = company?.name;
    this.modules = company?.modules?.map((module) => new ModuleDto(module));
  }
}

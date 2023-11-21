import { Company } from "@domain/entity/webeditor/Company";

export class CompanyDto {
  public Id: string;
  public Name: string;

  constructor(company: Company) {
    this.Id = company.id;
    this.Name = company.name;
  }
}

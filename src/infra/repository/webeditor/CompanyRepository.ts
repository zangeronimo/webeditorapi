import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
import { Company } from "@domain/entity/webeditor/Company";
import { DbContext } from "@infra/context/DbContext";

export class CompanyRepository implements ICompanyRepository {
  constructor(readonly db: DbContext) {}

  async getById(id: string): Promise<Company | null> {
    const [companyData] = await this.db.query(
      `select
        id, name
       from webeditor_companies
       where id = $1 and deleted_at is null`,
      [id]
    );
    return companyData
      ? Company.Restore(companyData.id, companyData.name)
      : null;
  }

  async getByName(name: string): Promise<Company | null> {
    const [companyData] = await this.db.query(
      `select
        id, name
       from webeditor_companies
       where name = $1 and deleted_at is null`,
      [name]
    );
    return companyData
      ? Company.Restore(companyData.id, companyData.name)
      : null;
  }

  async getAll(
    model: GetAllCompanyFilterModel
  ): Promise<{ itens: Company[]; total: number }> {
    let where = "deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $1`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * model.page;
    const [total] = await this.db.query(
      `select count(*) from webeditor_companies where ${where}`,
      [`%${model.name?.toLowerCase().noAccents()}%`]
    );
    const companiesData: any[] = await this.db.query(
      `select
        id, name
      from webeditor_companies
      where ${where}
      order by ${ordenation}
      limit $2
      offset $3`,
      [`%${model.name?.toLowerCase().noAccents()}%`, model.pageSize, offset]
    );
    const companies: Company[] = [];
    for (let i = 0; i < companiesData.length; i++) {
      const company = Company.Restore(
        companiesData[i].id,
        companiesData[i].name
      );
      companies.push(company);
    }
    return { itens: companies, total: total.count };
  }

  async delete(company: Company, date: Date): Promise<Company> {
    await this.db.query(
      "update webeditor_companies set deleted_at=$2, updated_at=$2 where id = $1 and deleted_at is null",
      [company.id, date]
    );
    return company;
  }

  async update(company: Company): Promise<Company> {
    await this.db.query(
      "update webeditor_companies set name=$2, updated_at=$3 where id = $1 and deleted_at is null",
      [company.id, company.name, company.updatedAt]
    );
    return company;
  }

  async save(company: Company): Promise<Company> {
    await this.db.query(
      "insert into webeditor_companies (id, name) values ($1, $2)",
      [company.id, company.name]
    );
    return company;
  }
}

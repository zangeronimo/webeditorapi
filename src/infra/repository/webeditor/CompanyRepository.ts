import { ICompanyRepository } from "@application/interface/repository/webeditor/ICompanyRepository";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
import { Company } from "@domain/entity/webeditor/Company";
import { Module } from "@domain/entity/webeditor/Module";
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
    const modulesData = await this.getModulesFromCompany(companyData?.id);
    return companyData
      ? Company.Restore(companyData.id, companyData.name, modulesData)
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
    const modulesData = await this.getModulesFromCompany(companyData?.id);
    return companyData
      ? Company.Restore(companyData.id, companyData.name, modulesData)
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
      const modulesData = await this.getModulesFromCompany(companiesData[i].id);
      const company = Company.Restore(
        companiesData[i].id,
        companiesData[i].name,
        modulesData
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
      `delete from webeditor_companies_has_webeditor_modules where webeditor_companies_id = $1`,
      [company.id]
    );
    await this.db.query(
      "update webeditor_companies set name=$2, updated_at=$3 where id = $1 and deleted_at is null",
      [company.id, company.name, company.updatedAt]
    );
    await this.addModulesForCompany(company.id, company.modules);
    return company;
  }

  async save(company: Company): Promise<Company> {
    await this.db.query(
      "insert into webeditor_companies (id, name) values ($1, $2)",
      [company.id, company.name]
    );
    await this.addModulesForCompany(company.id, company.modules);
    return company;
  }

  private async getModulesFromCompany(companyId: string): Promise<Module[]> {
    const modulesData = await this.db.query(
      `select
        m.id,
        m.name
      from
        webeditor_companies_has_webeditor_modules cm
      inner join webeditor_companies c on c.id=cm.webeditor_companies_id and c.deleted_at is null
      inner join webeditor_modules m on m.id=cm.webeditor_modules_id and m.deleted_at is null
      where
        cm.webeditor_companies_id = $1
      group by m.id
      order by m.name
      `,
      [companyId]
    );
    return modulesData.map((module: any) =>
      Module.Restore(module.id, module.name)
    );
  }

  private async addModulesForCompany(companyId: string, modules: Module[]) {
    for (let i = 0; i < modules.length; i++) {
      await this.db.query(
        `insert into webeditor_companies_has_webeditor_modules (webeditor_companies_id, webeditor_modules_id) values ($1, $2)`,
        [companyId, modules[i].id]
      );
    }
  }
}

import { ICompanyRepository } from "@application/interface/repository/webeditor";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company";
import { Company, Module } from "@domain/entity/webeditor";
import { DbContext } from "@infra/context";

export class CompanyRepository implements ICompanyRepository {
  constructor(readonly db: DbContext) {}
  async getByIdAsync(id: string): Promise<Company | null> {
    const [companyData] = await this.db.queryAsync(
      `select
        id, name
       from webeditor_companies
       where id = $1 and deleted_at is null`,
      [id]
    );
    const modulesData = await this.getModulesFromCompanyAsync(companyData?.id);
    return companyData
      ? Company.restore(companyData.id, companyData.name, modulesData)
      : null;
  }

  async getByNameAsync(name: string): Promise<Company | null> {
    const [companyData] = await this.db.queryAsync(
      `select
        id, name
       from webeditor_companies
       where name = $1 and deleted_at is null`,
      [name]
    );
    const modulesData = await this.getModulesFromCompanyAsync(companyData?.id);
    return companyData
      ? Company.restore(companyData.id, companyData.name, modulesData)
      : null;
  }

  async getAllAsync(
    model: GetAllCompanyFilterModel
  ): Promise<{ itens: Company[]; total: number }> {
    let where = "deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $1`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from webeditor_companies where ${where}`,
      [`%${model.name?.toLowerCase().noAccents()}%`]
    );
    const companiesData: any[] = await this.db.queryAsync(
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
      const modulesData = await this.getModulesFromCompanyAsync(
        companiesData[i].id
      );
      const company = Company.restore(
        companiesData[i].id,
        companiesData[i].name,
        modulesData
      );
      companies.push(company);
    }
    return { itens: companies, total: total.count };
  }

  async deleteAsync(company: Company, date: Date): Promise<Company> {
    await this.db.queryAsync(
      "update webeditor_companies set deleted_at=$2, updated_at=$2 where id = $1 and deleted_at is null",
      [company.id, date]
    );
    return company;
  }

  async updateAsync(company: Company): Promise<Company> {
    await this.db.queryAsync(
      `delete from webeditor_companies_has_webeditor_modules where webeditor_companies_id = $1`,
      [company.id]
    );
    await this.db.queryAsync(
      "update webeditor_companies set name=$2, updated_at=$3 where id = $1 and deleted_at is null",
      [company.id, company.name, company.updatedAt]
    );
    await this.addModulesForCompanyAsync(company.id, company.modules);
    return company;
  }

  async saveAsync(company: Company): Promise<Company> {
    await this.db.queryAsync(
      "insert into webeditor_companies (id, name) values ($1, $2)",
      [company.id, company.name]
    );
    await this.addModulesForCompanyAsync(company.id, company.modules);
    return company;
  }

  private async getModulesFromCompanyAsync(
    companyId: string
  ): Promise<Module[]> {
    const modulesData = await this.db.queryAsync(
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
      Module.restore(module.id, module.name)
    );
  }

  private async addModulesForCompanyAsync(
    companyId: string,
    modules: Module[]
  ) {
    for (let i = 0; i < modules.length; i++) {
      await this.db.queryAsync(
        `insert into webeditor_companies_has_webeditor_modules (webeditor_companies_id, webeditor_modules_id) values ($1, $2)`,
        [companyId, modules[i].id]
      );
    }
  }
}

import { INewsletterRepository } from "@application/interface/repository/institutional";
import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { Newsletter } from "@domain/entity/institutional";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class NewsletterRepository implements INewsletterRepository {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getByIdAsync(id: string, company: string): Promise<Newsletter | null> {
    const [newsletterData] = await this.db.queryAsync(
      `select
        id, email, name, active, webeditor_companies_id
       from institutional_newsletters
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return newsletterData
      ? Newsletter.restore(
          newsletterData.id,
          newsletterData.name,
          newsletterData.email,
          newsletterData.active,
          newsletterData.webeditor_companies_id
        )
      : null;
  }

  async getByEmailAsync(
    email: string,
    company: string
  ): Promise<Newsletter | null> {
    const [newsletterData] = await this.db.queryAsync(
      "select id, email, name, active, webeditor_companies_id from institutional_newsletters where email = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [email, company]
    );
    return newsletterData
      ? Newsletter.restore(
          newsletterData.id,
          newsletterData.name,
          newsletterData.email,
          newsletterData.active,
          newsletterData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllNewsletterFilterModel,
    company: string
  ): Promise<{ itens: Newsletter[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.email) {
      where += ` and LOWER(email) like $3`;
    }
    if (!!model.active) {
      where += ` and active = $4`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from institutional_newsletters where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        `%${model.email?.toLowerCase()}%`,
        model.active,
      ]
    );
    const newslettersData: any[] = await this.db.queryAsync(
      `select
        id, email, name, active, webeditor_companies_id
      from institutional_newsletters
      where ${where}
      order by ${ordenation}
      limit $5
      offset $6`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        `%${model.email?.toLowerCase()}%`,
        model.active,
        model.pageSize,
        offset,
      ]
    );
    const newsletters: Newsletter[] = [];
    for (let i = 0; i < newslettersData.length; i++) {
      const newsletter = Newsletter.restore(
        newslettersData[i].id,
        newslettersData[i].name,
        newslettersData[i].email,
        newslettersData[i].active,
        newslettersData[i].webeditor_companies_id
      );
      newsletters.push(newsletter);
    }
    return { itens: newsletters, total: total.count };
  }

  async deleteAsync(newsletter: Newsletter, date: Date): Promise<Newsletter> {
    await this.db.queryAsync(
      "update institutional_newsletters set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [newsletter.id, newsletter.companyId, date]
    );
    return newsletter;
  }

  async updateAsync(newsletter: Newsletter): Promise<Newsletter> {
    await this.db.queryAsync(
      "update institutional_newsletters set email=$3, name=$4, active=$5, updated_at=$6 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        newsletter.id,
        newsletter.companyId,
        newsletter.name,
        newsletter.email,
        newsletter.active,
        newsletter.updatedAt,
      ]
    );
    return newsletter;
  }

  async saveAsync(newsletter: Newsletter): Promise<Newsletter> {
    await this.db.queryAsync(
      "insert into institutional_newsletters (id, email, name, active, webeditor_companies_id) values ($1, $2, $3, $4, $5)",
      [
        newsletter.id,
        newsletter.name,
        newsletter.email,
        newsletter.active,
        newsletter.companyId,
      ]
    );
    return newsletter;
  }
}

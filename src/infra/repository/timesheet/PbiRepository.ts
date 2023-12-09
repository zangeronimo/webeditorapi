import { IPbiRepository } from "@application/interface/repository/timesheet";
import { GetAllPbiFilterModel } from "@application/model/timesheet/pbi";
import { Pbi } from "@domain/entity/timesheet";
import { DbContext } from "@infra/context";

export class PbiRepository implements IPbiRepository {
  constructor(readonly db: DbContext) {}

  async getByIdAsync(id: string, company: string): Promise<Pbi | null> {
    const [pbiData] = await this.db.queryAsync(
      `select
        id, name, description, status, timesheet_epics_id, webeditor_companies_id
       from timesheet_pbis
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return pbiData
      ? Pbi.restore(
          pbiData.id,
          pbiData.name,
          pbiData.description,
          pbiData.status,
          pbiData.timesheet_epics_id,
          pbiData.webeditor_companies_id
        )
      : null;
  }

  async getByNameAsync(
    name: string,
    pbiId: string,
    company: string
  ): Promise<Pbi | null> {
    const [pbiData] = await this.db.queryAsync(
      "select id, name, description, status, timesheet_epics_id, webeditor_companies_id from timesheet_pbis where name = $1 and timesheet_epics_id = $2 and webeditor_companies_id = $3 and deleted_at is null",
      [name, pbiId, company]
    );
    return pbiData
      ? Pbi.restore(
          pbiData.id,
          pbiData.name,
          pbiData.description,
          pbiData.status,
          pbiData.timesheet_epics_id,
          pbiData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllPbiFilterModel,
    company: string
  ): Promise<{ itens: Pbi[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.status) {
      where += ` and status = $3`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from timesheet_pbis where ${where}`,
      [company, `%${model.name?.toLowerCase().noAccents()}%`, model.status]
    );
    const pbisData: any[] = await this.db.queryAsync(
      `select
        id, name, description, status, timesheet_epics_id, webeditor_companies_id
      from timesheet_pbis
      where ${where}
      order by ${ordenation}
      limit $4
      offset $5`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.status,
        model.pageSize,
        offset,
      ]
    );
    const pbis: Pbi[] = [];
    for (let i = 0; i < pbisData.length; i++) {
      const pbi = Pbi.restore(
        pbisData[i].id,
        pbisData[i].name,
        pbisData[i].description,
        pbisData[i].status,
        pbisData[i].timesheet_epics_id,
        pbisData[i].webeditor_companies_id
      );
      pbis.push(pbi);
    }
    return { itens: pbis, total: total.count };
  }

  async deleteAsync(pbi: Pbi, date: Date): Promise<Pbi> {
    await this.db.queryAsync(
      "update timesheet_pbis set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [pbi.id, pbi.companyId, date]
    );
    return pbi;
  }

  async updateAsync(pbi: Pbi): Promise<Pbi> {
    await this.db.queryAsync(
      "update timesheet_pbis set name=$3, description=$4, status=$5, timesheet_epics_id=$6, updated_at=$7 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        pbi.id,
        pbi.companyId,
        pbi.name,
        pbi.description,
        pbi.status,
        pbi.epicId,
        pbi.updatedAt,
      ]
    );
    return pbi;
  }

  async saveAsync(pbi: Pbi): Promise<Pbi> {
    await this.db.queryAsync(
      "insert into timesheet_pbis (id, name, description, status, timesheet_epics_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6)",
      [pbi.id, pbi.name, pbi.description, pbi.status, pbi.epicId, pbi.companyId]
    );
    return pbi;
  }
}
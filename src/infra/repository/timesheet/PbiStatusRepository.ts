import { IPbiStatusRepository } from "@application/interface/repository/timesheet";
import { GetAllPbiStatusFilterModel } from "@application/model/timesheet/pbiStatus";
import { PbiStatus } from "@domain/entity/timesheet";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class PbiStatusRepository implements IPbiStatusRepository {
  constructor(
    @inject('DbContext')
    readonly db: DbContext
  ) {}
  async getByIdAsync(id: string, company: string): Promise<PbiStatus | null> {
    const [pbiStatusData] = await this.db.queryAsync(
      `select
        id, name, sort_order, status, webeditor_companies_id
       from timesheet_pbis_status
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return pbiStatusData
      ? PbiStatus.restore(
          pbiStatusData.id,
          pbiStatusData.name,
          pbiStatusData.sort_order,
          pbiStatusData.status,
          pbiStatusData.webeditor_companies_id
        )
      : null;
  }

  async getByNameAsync(
    name: string,
    company: string
  ): Promise<PbiStatus | null> {
    const [pbiStatusData] = await this.db.queryAsync(
      "select id, name, sort_order, status, webeditor_companies_id from timesheet_pbis_status where name = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [name, company]
    );
    return pbiStatusData
      ? PbiStatus.restore(
          pbiStatusData.id,
          pbiStatusData.name,
          pbiStatusData.sort_order,
          pbiStatusData.status,
          pbiStatusData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllPbiStatusFilterModel,
    company: string
  ): Promise<{ itens: PbiStatus[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.order) {
      where += ` and sort_order = $3`;
    }
    if (!!model.status) {
      where += ` and status = $4`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from timesheet_pbis_status where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.order,
        model.status,
      ]
    );
    const pbiStatusData: any[] = await this.db.queryAsync(
      `select
        id, name, sort_order, status, webeditor_companies_id
      from timesheet_pbis_status
      where ${where}
      order by ${ordenation}
      limit $5
      offset $6`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.order,
        model.status,
        model.pageSize,
        offset,
      ]
    );
    const pbiStatuss: PbiStatus[] = [];
    for (let i = 0; i < pbiStatusData.length; i++) {
      const pbiStatus = PbiStatus.restore(
        pbiStatusData[i].id,
        pbiStatusData[i].name,
        pbiStatusData[i].sort_order,
        pbiStatusData[i].status,
        pbiStatusData[i].webeditor_companies_id
      );
      pbiStatuss.push(pbiStatus);
    }
    return { itens: pbiStatuss, total: total.count };
  }

  async deleteAsync(pbiStatus: PbiStatus, date: Date): Promise<void> {
    await this.db.queryAsync(
      "update timesheet_pbis_status set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [pbiStatus.id, pbiStatus.companyId, date]
    );
  }

  async updateAsync(pbiStatus: PbiStatus): Promise<void> {
    await this.db.queryAsync(
      "update timesheet_pbis_status set name=$3, sort_order=$4, status=$5, updated_at=$6 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        pbiStatus.id,
        pbiStatus.companyId,
        pbiStatus.name,
        pbiStatus.order,
        pbiStatus.status,
        pbiStatus.updatedAt,
      ]
    );
  }

  async saveAsync(pbiStatus: PbiStatus): Promise<void> {
    await this.db.queryAsync(
      "insert into timesheet_pbis_status (id, name, sort_order, status, webeditor_companies_id) values ($1, $2, $3, $4, $5)",
      [
        pbiStatus.id,
        pbiStatus.name,
        pbiStatus.order,
        pbiStatus.status,
        pbiStatus.companyId,
      ]
    );
  }
}

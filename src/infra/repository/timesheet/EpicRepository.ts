import { IEpicRepository } from "@application/interface/repository/timesheet";
import { GetAllEpicFilterModel } from "@application/model/timesheet/epic";
import { Epic } from "@domain/entity/timesheet";
import { DbContext } from "@infra/context";

export class EpicRepository implements IEpicRepository {
  constructor(readonly db: DbContext) {}

  async getByIdAsync(id: string, company: string): Promise<Epic | null> {
    const [epicData] = await this.db.queryAsync(
      `select
        id, sequence, name, description, status, timesheet_projects_id, webeditor_companies_id
       from timesheet_epics
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return epicData
      ? Epic.restore(
          epicData.id,
          epicData.sequence,
          epicData.name,
          epicData.description,
          epicData.status,
          epicData.timesheet_projects_id,
          epicData.webeditor_companies_id
        )
      : null;
  }

  async getByNameAsync(
    name: string,
    epicId: string,
    company: string
  ): Promise<Epic | null> {
    const [epicData] = await this.db.queryAsync(
      "select id, sequence, name, description, status, timesheet_projects_id, webeditor_companies_id from timesheet_epics where name = $1 and timesheet_projects_id = $2 and webeditor_companies_id = $3 and deleted_at is null",
      [name, epicId, company]
    );
    return epicData
      ? Epic.restore(
          epicData.id,
          epicData.sequence,
          epicData.name,
          epicData.description,
          epicData.status,
          epicData.timesheet_projects_id,
          epicData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllEpicFilterModel,
    company: string
  ): Promise<{ itens: Epic[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.projectId) {
      where += ` and timesheet_projects_id = $3`;
    }
    if (!!model.status) {
      where += ` and status = $4`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from timesheet_epics where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.projectId,
        model.status,
      ]
    );
    const epicsData: any[] = await this.db.queryAsync(
      `select
        id, sequence, name, description, status, timesheet_projects_id, webeditor_companies_id
      from timesheet_epics
      where ${where}
      order by ${ordenation}
      limit $5
      offset $6`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.projectId,
        model.status,
        model.pageSize,
        offset,
      ]
    );
    const epics: Epic[] = [];
    for (let i = 0; i < epicsData.length; i++) {
      const epic = Epic.restore(
        epicsData[i].id,
        epicsData[i].sequence,
        epicsData[i].name,
        epicsData[i].description,
        epicsData[i].status,
        epicsData[i].timesheet_projects_id,
        epicsData[i].webeditor_companies_id
      );
      epics.push(epic);
    }
    return { itens: epics, total: total.count };
  }

  async deleteAsync(epic: Epic, date: Date): Promise<void> {
    await this.db.queryAsync(
      "update timesheet_epics set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [epic.id, epic.companyId, date]
    );
  }

  async updateAsync(epic: Epic): Promise<void> {
    await this.db.queryAsync(
      "update timesheet_epics set name=$3, description=$4, status=$5, timesheet_projects_id=$6, updated_at=$7 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        epic.id,
        epic.companyId,
        epic.name,
        epic.description,
        epic.status,
        epic.projectId,
        epic.updatedAt,
      ]
    );
  }

  async saveAsync(epic: Epic): Promise<void> {
    await this.db.queryAsync(
      "insert into timesheet_epics (id, name, description, status, timesheet_projects_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6)",
      [
        epic.id,
        epic.name,
        epic.description,
        epic.status,
        epic.projectId,
        epic.companyId,
      ]
    );
  }
}

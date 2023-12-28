import { IProjectRepository } from "@application/interface/repository/timesheet";
import { GetAllProjectFilterModel } from "@application/model/timesheet/project";
import { Project } from "@domain/entity/timesheet";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @inject('DbContext')
    readonly db: DbContext
  ) {}

  async getByIdAsync(id: string, company: string): Promise<Project | null> {
    const [projectData] = await this.db.queryAsync(
      `select
        id, sequence, name, description, status, timesheet_clients_id, webeditor_companies_id
       from timesheet_projects
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return projectData
      ? Project.restore(
          projectData.id,
          projectData.sequence,
          projectData.name,
          projectData.description,
          projectData.status,
          projectData.timesheet_clients_id,
          projectData.webeditor_companies_id
        )
      : null;
  }

  async getByNameAsync(
    name: string,
    clientId: string,
    company: string
  ): Promise<Project | null> {
    const [projectData] = await this.db.queryAsync(
      "select id, sequence, name, description, status, timesheet_clients_id, webeditor_companies_id from timesheet_projects where name = $1 and timesheet_clients_id = $2 and webeditor_companies_id = $3 and deleted_at is null",
      [name, clientId, company]
    );
    return projectData
      ? Project.restore(
          projectData.id,
          projectData.sequence,
          projectData.name,
          projectData.description,
          projectData.status,
          projectData.timesheet_clients_id,
          projectData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllProjectFilterModel,
    company: string
  ): Promise<{ itens: Project[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.clientId) {
      where += ` and timesheet_clients_id = $3`;
    }
    if (!!model.status) {
      where += ` and status = $4`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from timesheet_projects where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.clientId,
        model.status,
      ]
    );
    const projectsData: any[] = await this.db.queryAsync(
      `select
        id, sequence, name, description, status, timesheet_clients_id, webeditor_companies_id
      from timesheet_projects
      where ${where}
      order by ${ordenation}
      limit $5
      offset $6`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.clientId,
        model.status,
        model.pageSize,
        offset,
      ]
    );
    const projects: Project[] = [];
    for (let i = 0; i < projectsData.length; i++) {
      const project = Project.restore(
        projectsData[i].id,
        projectsData[i].sequence,
        projectsData[i].name,
        projectsData[i].description,
        projectsData[i].status,
        projectsData[i].timesheet_clients_id,
        projectsData[i].webeditor_companies_id
      );
      projects.push(project);
    }
    return { itens: projects, total: total.count };
  }

  async deleteAsync(project: Project, date: Date): Promise<void> {
    await this.db.queryAsync(
      "update timesheet_projects set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [project.id, project.companyId, date]
    );
  }

  async updateAsync(project: Project): Promise<void> {
    await this.db.queryAsync(
      "update timesheet_projects set name=$3, description=$4, status=$5, timesheet_clients_id=$6, updated_at=$7 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        project.id,
        project.companyId,
        project.name,
        project.description,
        project.status,
        project.clientId,
        project.updatedAt,
      ]
    );
  }

  async saveAsync(project: Project): Promise<void> {
    await this.db.queryAsync(
      "insert into timesheet_projects (id, name, description, status, timesheet_clients_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6)",
      [
        project.id,
        project.name,
        project.description,
        project.status,
        project.clientId,
        project.companyId,
      ]
    );
  }
}

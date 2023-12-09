import { ITaskRepository } from "@application/interface/repository/timesheet";
import { GetAllTaskFilterModel } from "@application/model/timesheet/task";
import { Task } from "@domain/entity/timesheet";
import { DbContext } from "@infra/context";

export class TaskRepository implements ITaskRepository {
  constructor(readonly db: DbContext) {}

  async getByIdAsync(id: string, company: string): Promise<Task | null> {
    const [taskData] = await this.db.queryAsync(
      `select
        id, name, description, status, timesheet_pbis_id, webeditor_companies_id
       from timesheet_tasks
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return taskData
      ? Task.restore(
          taskData.id,
          taskData.name,
          taskData.description,
          taskData.status,
          taskData.timesheet_pbis_id,
          taskData.webeditor_companies_id
        )
      : null;
  }

  async getByNameAsync(
    name: string,
    taskId: string,
    company: string
  ): Promise<Task | null> {
    const [taskData] = await this.db.queryAsync(
      "select id, name, description, status, timesheet_pbis_id, webeditor_companies_id from timesheet_tasks where name = $1 and timesheet_pbis_id = $2 and webeditor_companies_id = $3 and deleted_at is null",
      [name, taskId, company]
    );
    return taskData
      ? Task.restore(
          taskData.id,
          taskData.name,
          taskData.description,
          taskData.status,
          taskData.timesheet_pbis_id,
          taskData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllTaskFilterModel,
    company: string
  ): Promise<{ itens: Task[]; total: number }> {
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
      `select count(*) from timesheet_tasks where ${where}`,
      [company, `%${model.name?.toLowerCase().noAccents()}%`, model.status]
    );
    const tasksData: any[] = await this.db.queryAsync(
      `select
        id, name, description, status, timesheet_pbis_id, webeditor_companies_id
      from timesheet_tasks
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
    const tasks: Task[] = [];
    for (let i = 0; i < tasksData.length; i++) {
      const task = Task.restore(
        tasksData[i].id,
        tasksData[i].name,
        tasksData[i].description,
        tasksData[i].status,
        tasksData[i].timesheet_pbis_id,
        tasksData[i].webeditor_companies_id
      );
      tasks.push(task);
    }
    return { itens: tasks, total: total.count };
  }

  async deleteAsync(task: Task, date: Date): Promise<Task> {
    await this.db.queryAsync(
      "update timesheet_tasks set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [task.id, task.companyId, date]
    );
    return task;
  }

  async updateAsync(task: Task): Promise<Task> {
    await this.db.queryAsync(
      "update timesheet_tasks set name=$3, description=$4, status=$5, timesheet_pbis_id=$6, updated_at=$7 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        task.id,
        task.companyId,
        task.name,
        task.description,
        task.status,
        task.pbiId,
        task.updatedAt,
      ]
    );
    return task;
  }

  async saveAsync(task: Task): Promise<Task> {
    await this.db.queryAsync(
      "insert into timesheet_tasks (id, name, description, status, timesheet_pbis_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6)",
      [
        task.id,
        task.name,
        task.description,
        task.status,
        task.pbiId,
        task.companyId,
      ]
    );
    return task;
  }
}

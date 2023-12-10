import { ITaskRepository } from "@application/interface/repository/timesheet";
import { GetAllTaskFilterModel } from "@application/model/timesheet/task";
import { Task } from "@domain/entity/timesheet";
import { EntryTypeEnum } from "@domain/enum/EntryTypeEnum";
import { Entry } from "@domain/valueObject/timesheet";
import { DbContext } from "@infra/context";

export class TaskRepository implements ITaskRepository {
  constructor(readonly db: DbContext) {}
  commitAsync(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getByIdAsync(id: string, company: string): Promise<Task | null> {
    const [taskData] = await this.db.queryAsync(
      `select
        id, name, description, status, timesheet_pbis_id, webeditor_companies_id
       from timesheet_tasks
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    const entries = await this.getEntriesAsync(id, company);

    return taskData
      ? Task.restore(
          taskData.id,
          taskData.name,
          taskData.description,
          taskData.status,
          taskData.timesheet_pbis_id,
          taskData.webeditor_companies_id,
          entries
        )
      : null;
  }

  async checkTaskHasOpenedByUser(
    userId: string,
    taskId: string,
    company: string
  ): Promise<boolean> {
    const [taskData] = await this.db.queryAsync(
      `select
        entry_type
       from timesheet_entries
       where webeditor_users_id = $1 and timesheet_tasks_id = $2 and webeditor_companies_id = $3
       order by point_date desc
       limit 1`,
      [userId, taskId, company]
    );

    return taskData?.entry_type === EntryTypeEnum.OPEN;
  }

  async checkUserHasOtherTaskOpenedAsync(
    userId: string,
    taskId: string,
    company: string
  ): Promise<boolean> {
    const [taskData] = await this.db.queryAsync(
      `select
        entry_type
       from timesheet_entries
       where webeditor_users_id = $1 and timesheet_tasks_id != $2 and webeditor_companies_id = $3
       order by point_date desc
       limit 1`,
      [userId, taskId, company]
    );

    return taskData?.entry_type === EntryTypeEnum.OPEN;
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
          taskData.webeditor_companies_id,
          []
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
    if (!!model.pbiId) {
      where += ` and timesheet_pbis_id = $3`;
    }
    if (!!model.status) {
      where += ` and status = $4`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from timesheet_tasks where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.pbiId,
        model.status,
      ]
    );
    const tasksData: any[] = await this.db.queryAsync(
      `select
        id, name, description, status, timesheet_pbis_id, webeditor_companies_id
      from timesheet_tasks
      where ${where}
      order by ${ordenation}
      limit $5
      offset $6`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.pbiId,
        model.status,
        model.pageSize,
        offset,
      ]
    );
    const tasks: Task[] = [];
    for (let i = 0; i < tasksData.length; i++) {
      const entries = await this.getEntriesAsync(tasksData[i].id, company);
      const task = Task.restore(
        tasksData[i].id,
        tasksData[i].name,
        tasksData[i].description,
        tasksData[i].status,
        tasksData[i].timesheet_pbis_id,
        tasksData[i].webeditor_companies_id,
        entries
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
    const hasEntries = task.entries.length > 0;
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
      ],
      hasEntries
    );
    if (hasEntries) {
      await this.db.queryAsync(
        "delete from timesheet_entries where timesheet_tasks_id = $1",
        [task.id],
        true
      );
      for (let i = 0; i < task.entries.length; i++) {
        const entry = task.entries[i];
        await this.db.queryAsync(
          "insert into timesheet_entries (point_date, entry_type, timesheet_tasks_id, webeditor_users_id, webeditor_companies_id) values ($1, $2, $3, $4, $5)",
          [
            entry.pointDate,
            entry.entryType,
            entry.taskId,
            entry.userId,
            task.companyId,
          ],
          true
        );
      }
      await this.db.commitAsync();
    }
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

  private async getEntriesAsync(
    taskId: string,
    company: string
  ): Promise<Entry[]> {
    const entriesData = await this.db.queryAsync(
      `select
         point_date, entry_type, timesheet_tasks_id, webeditor_users_id
       from timesheet_entries
       where timesheet_tasks_id = $1 and webeditor_companies_id = $2
       order by point_date`,
      [taskId, company]
    );

    return entriesData.map(
      (entry: any) =>
        new Entry(
          entry.timesheet_tasks_id,
          entry.webeditor_users_id,
          entry.entry_type,
          entry.point_date
        )
    );
  }
}

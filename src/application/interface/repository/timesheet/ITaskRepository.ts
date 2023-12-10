import { GetAllTaskFilterModel } from "@application/model/timesheet/task";
import { Task } from "@domain/entity/timesheet";

export interface ITaskRepository {
  getByIdAsync(id: string, company: string): Promise<Task | null>;
  checkTaskHasOpenedByUser(
    userId: string,
    taskId: string,
    company: string
  ): Promise<boolean>;
  checkUserHasOtherTaskOpenedAsync(
    userId: string,
    taskId: string,
    company: string
  ): Promise<boolean>;
  getByNameAsync(
    name: string,
    pbiId: string,
    company: string
  ): Promise<Task | null>;
  getAllAsync(
    model: GetAllTaskFilterModel,
    company: string
  ): Promise<{ itens: Task[]; total: number }>;
  updateAsync(task: Task): Promise<Task>;
  saveAsync(task: Task): Promise<Task>;
  deleteAsync(task: Task, date: Date): Promise<Task>;
}

import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  ITaskGetAll,
  ITaskGetById,
  ITaskCreate,
  ITaskUpdate,
  ITaskDelete,
  ITaskRegisterWork,
} from "@application/interface/usecase/timesheet/task";
import {
  TaskCreateDataModel,
  TaskUpdateDataModel,
  GetAllTaskFilterModel,
} from "@application/model/timesheet/task";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class TaskController {
  @inject("ITaskGetAll")
  taskGetAll?: ITaskGetAll;
  @inject("ITaskGetById")
  taskGetById?: ITaskGetById;
  @inject("ITaskCreate")
  taskCreate?: ITaskCreate;
  @inject("ITaskUpdate")
  taskUpdate?: ITaskUpdate;
  @inject("ITaskRegisterWork")
  taskRegisterWork?: ITaskRegisterWork;
  @inject("ITaskDelete")
  taskDelete?: ITaskDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_TASK_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_TASK_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_TASK_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_TASK_UPDATE"),
      this.updateAsync
    );
    this.router.patch(
      "/register-work/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_TASK_UPDATE"),
      this.registerWorkAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_TASK_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllTaskFilterModel = new GetAllTaskFilterModel(req.query);
      const tasks = await this.taskGetAll?.executeAsync(
        getAllTaskFilterModel,
        company
      );
      return res.json(tasks);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const task = await this.taskGetById?.executeAsync(id, company);
      return res.json(task);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, description, status, pbi } = req.body;
      const taskCreateDataModel = new TaskCreateDataModel(
        name,
        description,
        status,
        pbi.id
      );
      const task = await this.taskCreate?.executeAsync(
        taskCreateDataModel,
        company
      );
      return res.status(201).json(task);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, name, description, status, pbi } = req.body;
      const taskUpdateDataModel = new TaskUpdateDataModel(
        id,
        name,
        description,
        status,
        pbi.id
      );
      const task = await this.taskUpdate?.executeAsync(
        taskUpdateDataModel,
        company
      );
      return res.json(task);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private registerWorkAsync = async (req: Request, res: Response) => {
    try {
      const { id: userId, company } = req.user;
      const { id } = req.params;
      await this.taskRegisterWork?.executeAsync(id, userId, company);
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const task = await this.taskDelete?.executeAsync(id, company);
      return res.json(task);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

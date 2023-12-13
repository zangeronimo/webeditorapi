import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IProjectGetAll,
  IProjectGetById,
  IProjectCreate,
  IProjectUpdate,
  IProjectDelete,
} from "@application/interface/usecase/timesheet/project";
import {
  ProjectCreateDataModel,
  ProjectUpdateDataModel,
  GetAllProjectFilterModel,
} from "@application/model/timesheet/project";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class ProjectController {
  @inject("IProjectGetAll")
  projectGetAll?: IProjectGetAll;
  @inject("IProjectGetById")
  projectGetById?: IProjectGetById;
  @inject("IProjectCreate")
  projectCreate?: IProjectCreate;
  @inject("IProjectUpdate")
  projectUpdate?: IProjectUpdate;
  @inject("IProjectDelete")
  projectDelete?: IProjectDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PROJECT_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PROJECT_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PROJECT_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PROJECT_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("TIMESHEET_PROJECT_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllProjectFilterModel = new GetAllProjectFilterModel(req.query);
      const projects = await this.projectGetAll?.executeAsync(
        getAllProjectFilterModel,
        company
      );
      return res.json(projects);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const project = await this.projectGetById?.executeAsync(id, company);
      return res.json(project);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, description, status, clientId } = req.body;
      const projectCreateDataModel = new ProjectCreateDataModel(
        name,
        description,
        status,
        clientId
      );
      const project = await this.projectCreate?.executeAsync(
        projectCreateDataModel,
        company
      );
      return res.status(201).json(project);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, name, description, status, clientId } = req.body;
      const projectUpdateDataModel = new ProjectUpdateDataModel(
        id,
        name,
        description,
        status,
        clientId
      );
      const project = await this.projectUpdate?.executeAsync(
        projectUpdateDataModel,
        company
      );
      return res.json(project);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      await this.projectDelete?.executeAsync(id, company);
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

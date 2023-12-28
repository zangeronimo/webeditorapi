import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllProjectFilterModel,
  ProjectCreateDataModel,
  ProjectUpdateDataModel,
} from "@application/model/timesheet/project";
import { ProjectCreate, ProjectDelete, ProjectGetAll, ProjectGetById, ProjectUpdate } from "@application/usecase/timesheet/project";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class ProjectController {
  router = Router();
  projectGetAll = container.resolve(ProjectGetAll);
  projectGetById = container.resolve(ProjectGetById);
  projectCreate = container.resolve(ProjectCreate);
  projectUpdate = container.resolve(ProjectUpdate);
  projectDelete = container.resolve(ProjectDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PROJECT_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PROJECT_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PROJECT_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PROJECT_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("TIMESHEET_PROJECT_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllProjectFilterModel = new GetAllProjectFilterModel(req.query);
      const projects = await this.projectGetAll.executeAsync(
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
      const project = await this.projectGetById.executeAsync(id, company);
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
      const project = await this.projectCreate.executeAsync(
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
      const project = await this.projectUpdate.executeAsync(
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
      await this.projectDelete.executeAsync(id, company);
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  CompanyCreateDataModel,
  CompanyUpdateDataModel,
  GetAllCompanyFilterModel,
} from "@application/model/webeditor/company";
import {
  CompanyCreate,
  CompanyDelete,
  CompanyGetAll,
  CompanyGetById,
  CompanyUpdate,
} from "@application/usecase/webeditor/company";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class CompanyController {
  router = Router();
  companyGetAll = container.resolve(CompanyGetAll);
  companyGetById = container.resolve(CompanyGetById);
  companyCreate = container.resolve(CompanyCreate);
  companyUpdate = container.resolve(CompanyUpdate);
  companyDelete = container.resolve(CompanyDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_COMPANY_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_COMPANY_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_COMPANY_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_COMPANY_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("WEBEDITOR_COMPANY_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const getAllCompanyFilterModel = new GetAllCompanyFilterModel(req.query);
      const companies = await this.companyGetAll.executeAsync(
        getAllCompanyFilterModel
      );
      res.json(companies);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const company = await this.companyGetById.executeAsync(id);
      res.json(company);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, modules } = req.body;
      const companyCreateDataModel = new CompanyCreateDataModel(name, modules);
      const company = await this.companyCreate.executeAsync(
        companyCreateDataModel
      );
      res.status(201).json(company);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, name, modules } = req.body;
      const companyUpdateDataModel = new CompanyUpdateDataModel(
        id,
        name,
        modules
      );
      const company = await this.companyUpdate.executeAsync(
        companyUpdateDataModel
      );
      res.json(company);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const company = await this.companyDelete.executeAsync(id);
      res.json(company);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  ICompanyCreate,
  ICompanyDelete,
  ICompanyGetAll,
  ICompanyGetById,
  ICompanyUpdate,
} from "@application/interface/usecase/webeditor/company";
import {
  CompanyCreateDataModel,
  CompanyUpdateDataModel,
  GetAllCompanyFilterModel,
} from "@application/model/webeditor/company";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class CompanyController {
  @inject("ICompanyGetAll")
  companyGetAll?: ICompanyGetAll;
  @inject("ICompanyGetById")
  companyGetById?: ICompanyGetById;
  @inject("ICompanyCreate")
  companyCreate?: ICompanyCreate;
  @inject("ICompanyUpdate")
  companyUpdate?: ICompanyUpdate;
  @inject("ICompanyDelete")
  companyDelete?: ICompanyDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_COMPANY_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_COMPANY_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_COMPANY_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_COMPANY_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("WEBEDITOR_COMPANY_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const getAllCompanyFilterModel = new GetAllCompanyFilterModel(req.query);
      const companies = await this.companyGetAll?.executeAsync(
        getAllCompanyFilterModel
      );
      return res.json(companies);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await this.companyGetById?.executeAsync(id);
      return res.json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { name, modules } = req.body;
      const companyCreateDataModel = new CompanyCreateDataModel(name, modules);
      const company = await this.companyCreate?.executeAsync(
        companyCreateDataModel
      );
      return res.status(201).json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { id, name, modules } = req.body;
      const companyUpdateDataModel = new CompanyUpdateDataModel(
        id,
        name,
        modules
      );
      const company = await this.companyUpdate?.executeAsync(
        companyUpdateDataModel
      );
      return res.json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await this.companyDelete?.executeAsync(id);
      return res.json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

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
import { inject } from "@infra/di";
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
      ensureHasRole.execute("WEBEDITOR_COMPANY_VIEW"),
      this.getAll
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_COMPANY_VIEW"),
      this.getById
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_COMPANY_UPDATE"),
      this.create
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_COMPANY_UPDATE"),
      this.update
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.execute("WEBEDITOR_COMPANY_DELETE"),
      this.delete
    );
  }

  private getAll = async (req: Request, res: Response) => {
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

  private getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await this.companyGetById?.executeAsync(id);
      return res.json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private create = async (req: Request, res: Response) => {
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

  private update = async (req: Request, res: Response) => {
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

  private delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await this.companyDelete?.executeAsync(id);
      return res.json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

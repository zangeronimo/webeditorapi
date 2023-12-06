import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { EnsureHasRole } from "@api/midleware/EnsureHasRole";
import { ICompanyCreate } from "@application/interface/usecase/webeditor/company/ICompanyCreate";
import { ICompanyDelete } from "@application/interface/usecase/webeditor/company/ICompanyDelete";
import { ICompanyGetAll } from "@application/interface/usecase/webeditor/company/ICompanyGetAll";
import { ICompanyGetById } from "@application/interface/usecase/webeditor/company/ICompanyGetById";
import { ICompanyUpdate } from "@application/interface/usecase/webeditor/company/ICompanyUpdate";
import { CompanyCreateDataModel } from "@application/model/webeditor/company/CompanyCreateModel";
import { CompanyUpdateDataModel } from "@application/model/webeditor/company/CompanyUpdateModel";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
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

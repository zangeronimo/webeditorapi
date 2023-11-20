import { EnsureAuthenticated } from "@api/midleware/EnsureAuthenticated";
import { ICompanyCreate } from "@application/interface/usecase/webeditor/company/ICompanyCreate";
import { ICompanyDelete } from "@application/interface/usecase/webeditor/company/ICompanyDelete";
import { ICompanyGetAll } from "@application/interface/usecase/webeditor/company/ICompanyGetAll";
import { ICompanyGetById } from "@application/interface/usecase/webeditor/company/ICompanyGetById";
import { ICompanyUpdate } from "@application/interface/usecase/webeditor/company/ICompanyUpdate";
import { GetAllCompanyFilterModel } from "@application/model/webeditor/company/GetAllCompanyFilterModel";
import { CompanyCreateDataModel } from "@application/model/webeditor/company/CompanyCreateModel";
import { CompanyUpdateDataModel } from "@application/model/webeditor/company/CompanyUpdateModel";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";
import { EnsureHasRole } from "@api/midleware/EnsureHasRole";

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
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_COMPANY_VIEW"),
      this.GetAll
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_COMPANY_VIEW"),
      this.GetById
    );
    this.router.post(
      "",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_COMPANY_UPDATE"),
      this.Create
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_COMPANY_UPDATE"),
      this.Update
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.Execute,
      ensureHasRole.Execute("WEBEDITOR_COMPANY_DELETE"),
      this.Delete
    );
  }

  GetAll = async (req: Request, res: Response) => {
    try {
      const getAllCompanyFilterModel = new GetAllCompanyFilterModel(req.query);
      const companies = await this.companyGetAll?.ExecuteAsync(
        getAllCompanyFilterModel
      );
      return res.json(companies);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  GetById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await this.companyGetById?.ExecuteAsync(id);
      return res.json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Create = async (req: Request, res: Response) => {
    try {
      const { name, label, order, moduleId } = req.body;
      const companyCreateDataModel = new CompanyCreateDataModel(name);
      const company = await this.companyCreate?.ExecuteAsync(
        companyCreateDataModel
      );
      return res.status(201).json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Update = async (req: Request, res: Response) => {
    try {
      const { id, name, label, order, moduleId } = req.body;
      const companyUpdateDataModel = new CompanyUpdateDataModel(id, name);
      const company = await this.companyUpdate?.ExecuteAsync(
        companyUpdateDataModel
      );
      return res.json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  Delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await this.companyDelete?.ExecuteAsync(id);
      return res.json(company);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

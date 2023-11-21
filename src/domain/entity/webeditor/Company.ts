import { CompanyCreateDataModel } from "@application/model/webeditor/company/CompanyCreateModel";
import { CompanyUpdateDataModel } from "@application/model/webeditor/company/CompanyUpdateModel";
import { Module } from "./Module";

export class Company {
  private _id: string;
  private _name: string;
  private _updatedAt?: Date;
  private _modules: Module[];

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get updatedAt() {
    return this._updatedAt;
  }
  public get modules() {
    return this._modules;
  }

  private constructor(id: string, name: string, modules: Module[]) {
    this._id = id;
    this._name = name;
    this._modules = modules;
  }

  public static Restore(id: string, name: string, modules: Module[]): Company {
    return new Company(id, name, modules);
  }

  public static Create(model: CompanyCreateDataModel): Company {
    const company = new Company(crypto.randomUUID(), model.name, model.modules);
    return company;
  }

  async Update(model: CompanyUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
    this._modules = model.modules;
  }
}

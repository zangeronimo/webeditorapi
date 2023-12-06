import {
  CompanyCreateDataModel,
  CompanyUpdateDataModel,
} from "@application/model/webeditor/company";
import { Module } from "./Module";

export class Company {
  private _id: string;
  private _name: string;
  private _updatedAt?: Date;
  private _modules: Module[];

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get modules() {
    return this._modules;
  }

  private constructor(id: string, name: string, modules: Module[]) {
    this._id = id;
    this._name = name;
    this._modules = modules;
  }

  static restore(id: string, name: string, modules: Module[]): Company {
    return new Company(id, name, modules);
  }

  static create(model: CompanyCreateDataModel): Company {
    const company = new Company(crypto.randomUUID(), model.name, model.modules);
    return company;
  }

  update(model: CompanyUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
    this._modules = model.modules;
  }
}

import {
  CompanyCreateDataModel,
  CompanyUpdateDataModel,
} from "@application/model/webeditor/company";
import { EntityBase } from "../EntityBase";
import { Module } from "./Module";

export class Company extends EntityBase {
  private _name: string;
  private _modules: Module[];

  get name() {
    return this._name;
  }
  get modules() {
    return this._modules;
  }

  private constructor(
    name: string,
    modules: Module[],
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super("", id, createdAt, updatedAt);
    this._name = name;
    this._modules = modules;
  }

  static restore(
    id: string,
    name: string,
    modules: Module[],
    createdAt: Date,
    updatedAt: Date
  ): Company {
    return new Company(name, modules, id, createdAt, updatedAt);
  }

  static create(model: CompanyCreateDataModel): Company {
    const company = new Company(model.name, model.modules);
    return company;
  }

  update(model: CompanyUpdateDataModel) {
    this.updateBase();
    this._name = model.name;
    this._modules = model.modules;
  }
}

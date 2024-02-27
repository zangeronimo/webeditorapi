import {
  ModuleCreateDataModel,
  ModuleUpdateDataModel,
} from "@application/model/webeditor/module";
import { EntityBase } from "../EntityBase";

export class Module extends EntityBase {
  private _name: string;

  get name() {
    return this._name;
  }

  private constructor(
    name: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super("", id, createdAt, updatedAt);
    this._name = name;
  }

  static restore(
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date
  ): Module {
    return new Module(name, id, createdAt, updatedAt);
  }

  static create(model: ModuleCreateDataModel): Module {
    const module = new Module(model.name);
    return module;
  }

  update(model: ModuleUpdateDataModel) {
    this.updateBase();
    this._name = model.name;
  }
}

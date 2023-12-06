import { ModuleCreateDataModel } from "@application/model/webeditor/module/ModuleCreateModel";
import { ModuleUpdateDataModel } from "@application/model/webeditor/module/ModuleUpdateModel";

export class Module {
  private _id: string;
  private _name: string;
  private _updatedAt?: Date;

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  static restore(id: string, name: string): Module {
    return new Module(id, name);
  }

  static create(model: ModuleCreateDataModel): Module {
    const module = new Module(crypto.randomUUID(), model.name);
    return module;
  }

  update(model: ModuleUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
  }
}

import { ModuleCreateDataModel } from "@application/model/webeditor/module/ModuleCreateModel";
import { ModuleUpdateDataModel } from "@application/model/webeditor/module/ModuleUpdateModel";

export class Module {
  private _id: string;
  private _name: string;
  private _updatedAt?: Date;

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get updatedAt() {
    return this._updatedAt;
  }

  private constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  public static Restore(id: string, name: string): Module {
    return new Module(id, name);
  }

  public static Create(model: ModuleCreateDataModel): Module {
    const module = new Module(crypto.randomUUID(), model.name);
    return module;
  }

  async Update(model: ModuleUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
  }
}

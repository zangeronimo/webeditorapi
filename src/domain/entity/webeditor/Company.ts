import { CompanyCreateDataModel } from "@application/model/webeditor/company/CompanyCreateModel";
import { CompanyUpdateDataModel } from "@application/model/webeditor/company/CompanyUpdateModel";

export class Company {
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

  public static Restore(id: string, name: string): Company {
    return new Company(id, name);
  }

  public static Create(model: CompanyCreateDataModel): Company {
    const company = new Company(crypto.randomUUID(), model.name);
    return company;
  }

  async Update(model: CompanyUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
  }
}

import {
  ProjectCreateDataModel,
  ProjectUpdateDataModel,
} from "@application/model/timesheet/project";
import { ActiveEnum } from "@domain/enum";

export class Project {
  private _id: string;
  private _name: string;
  private _description: string;
  private _status: ActiveEnum;
  private _updatedAt?: Date;

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get status() {
    return this._status;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    name: string,
    description: string,
    status: ActiveEnum,
    readonly companyId: string
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._status = status;
  }

  static restore(
    id: string,
    name: string,
    description: string,
    status: ActiveEnum,
    companyId: string
  ): Project {
    return new Project(id, name, description, status, companyId);
  }

  static create(model: ProjectCreateDataModel, companyId: string): Project {
    const company = new Project(
      crypto.randomUUID(),
      model.name,
      model.description,
      model.status,
      companyId
    );
    return company;
  }

  update(model: ProjectUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
    this._description = model.description;
    this._status = model.status;
  }
}

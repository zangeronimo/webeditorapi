import {
  EpicCreateDataModel,
  EpicUpdateDataModel,
} from "@application/model/timesheet/epic";
import { ActiveEnum } from "@domain/enum";

export class Epic {
  private _id: string;
  private _name: string;
  private _description: string;
  private _status: ActiveEnum;
  private _projectId?: string;
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
  get projectId() {
    return this._projectId;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    name: string,
    description: string,
    status: ActiveEnum,
    projectId: string,
    readonly companyId: string
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._status = status;
    this._projectId = projectId;
  }

  static restore(
    id: string,
    name: string,
    description: string,
    status: ActiveEnum,
    projectId: string,
    companyId: string
  ): Epic {
    return new Epic(id, name, description, status, projectId, companyId);
  }

  static create(model: EpicCreateDataModel, companyId: string): Epic {
    const epic = new Epic(
      crypto.randomUUID(),
      model.name,
      model.description,
      model.status,
      model.projectId,
      companyId
    );
    return epic;
  }

  update(model: EpicUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
    this._description = model.description;
    this._status = model.status;
    this._projectId = model.projectId;
  }
}

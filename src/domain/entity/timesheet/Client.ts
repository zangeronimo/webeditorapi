import {
  ClientCreateDataModel,
  ClientUpdateDataModel,
} from "@application/model/timesheet/client";
import { ActiveEnum } from "@domain/enum";

export class Client {
  private _id: string;
  private _name: string;
  private _status: ActiveEnum;
  private _updatedAt?: Date;

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
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
    status: ActiveEnum,
    readonly companyId: string
  ) {
    this._id = id;
    this._name = name;
    this._status = status;
  }

  static restore(
    id: string,
    name: string,
    status: ActiveEnum,
    companyId: string
  ): Client {
    return new Client(id, name, status, companyId);
  }

  static create(model: ClientCreateDataModel, companyId: string): Client {
    const company = new Client(
      crypto.randomUUID(),
      model.name,
      model.status,
      companyId
    );
    return company;
  }

  update(model: ClientUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
    this._status = model.status;
  }
}

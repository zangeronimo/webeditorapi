import {
  PbiStatusCreateDataModel,
  PbiStatusUpdateDataModel,
} from "@application/model/timesheet/pbiStatus";
import { ActiveEnum } from "@domain/enum";

export class PbiStatus {
  private _id: string;
  private _name: string;
  private _order: number;
  private _status: ActiveEnum;
  private _clientId?: string;
  private _updatedAt?: Date;

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get order() {
    return this._order;
  }
  get status() {
    return this._status;
  }
  get clientId() {
    return this._clientId;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    name: string,
    order: number,
    status: ActiveEnum,
    clientId: string,
    readonly companyId: string,
    readonly sequence?: number
  ) {
    this._id = id;
    this._name = name;
    this._order = order;
    this._status = status;
    this._clientId = clientId;
  }

  static restore(
    id: string,
    name: string,
    order: number,
    status: ActiveEnum,
    clientId: string,
    companyId: string
  ): PbiStatus {
    return new PbiStatus(id, name, order, status, clientId, companyId);
  }

  static create(model: PbiStatusCreateDataModel, companyId: string): PbiStatus {
    const pbi = new PbiStatus(
      crypto.randomUUID(),
      model.name,
      model.order,
      model.status,
      model.clientId,
      companyId
    );
    return pbi;
  }

  update(model: PbiStatusUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
    this._order = model.order;
    this._status = model.status;
    this._clientId = model.clientId;
  }
}

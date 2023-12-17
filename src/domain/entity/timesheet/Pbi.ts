import {
  PbiCreateDataModel,
  PbiUpdateDataModel,
} from "@application/model/timesheet/pbi";
import { ActiveEnum, EntryTypeEnum } from "@domain/enum";
import { Entry } from "@domain/valueObject/timesheet";

export class Pbi {
  private _id: string;
  private _name: string;
  private _description: string;
  private _order: number;
  private _status: ActiveEnum;
  private _epicId?: string;
  private _pbiStatusId?: string;
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
  get order() {
    return this._order;
  }
  get status() {
    return this._status;
  }
  get epicId() {
    return this._epicId;
  }
  get pbiStatusId() {
    return this._pbiStatusId;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    name: string,
    description: string,
    order: number,
    status: ActiveEnum,
    epicId: string,
    pbiStatusId: string,
    readonly companyId: string,
    readonly sequence?: number,
    readonly entries: Entry[] = []
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._order = order;
    this._status = status;
    this._epicId = epicId;
    this._pbiStatusId = pbiStatusId;
  }

  static restore(
    id: string,
    sequence: number,
    name: string,
    description: string,
    order: number,
    status: ActiveEnum,
    epicId: string,
    pbiStatusId: string,
    companyId: string,
    entries?: Entry[]
  ): Pbi {
    return new Pbi(
      id,
      name,
      description,
      order,
      status,
      epicId,
      pbiStatusId,
      companyId,
      sequence,
      entries
    );
  }

  static create(model: PbiCreateDataModel, companyId: string): Pbi {
    const pbi = new Pbi(
      crypto.randomUUID(),
      model.name,
      model.description,
      model.order,
      model.status,
      model.epicId,
      model.pbiStatusId,
      companyId
    );
    return pbi;
  }

  update(model: PbiUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
    this._description = model.description;
    (this._order = model.order), (this._status = model.status);
    this._epicId = model.epicId;
    this._pbiStatusId = model.pbiStatusId;
  }

  startsWork(userId: string) {
    this._updatedAt = new Date();
    const entry = new Entry(this._id, userId, EntryTypeEnum.OPEN, new Date());
    this.entries.push(entry);
  }

  stopsWork(userId: string) {
    this._updatedAt = new Date();
    const entry = new Entry(this._id, userId, EntryTypeEnum.CLOSE, new Date());
    this.entries.push(entry);
  }
}

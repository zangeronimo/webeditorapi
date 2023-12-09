import {
  TaskCreateDataModel,
  TaskUpdateDataModel,
} from "@application/model/timesheet/task";
import { ActiveEnum } from "@domain/enum";
import { EntryTypeEnum } from "@domain/enum/EntryTypeEnum";
import { Entry } from "@domain/valueObject/timesheet";

export class Task {
  private _id: string;
  private _name: string;
  private _description: string;
  private _status: ActiveEnum;
  private _pbiId?: string;
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
  get pbiId() {
    return this._pbiId;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    name: string,
    description: string,
    status: ActiveEnum,
    pbiId: string,
    readonly companyId: string,
    readonly entries: Entry[] = []
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._status = status;
    this._pbiId = pbiId;
  }

  static restore(
    id: string,
    name: string,
    description: string,
    status: ActiveEnum,
    pbiId: string,
    companyId: string,
    entries: Entry[]
  ): Task {
    return new Task(id, name, description, status, pbiId, companyId, entries);
  }

  static create(model: TaskCreateDataModel, companyId: string): Task {
    const task = new Task(
      crypto.randomUUID(),
      model.name,
      model.description,
      model.status,
      model.pbiId,
      companyId,
      []
    );
    return task;
  }

  update(model: TaskUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = model.name;
    this._description = model.description;
    this._status = model.status;
    this._pbiId = model.pbiId;
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

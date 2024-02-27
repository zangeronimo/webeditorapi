import {
  RoleCreateDataModel,
  RoleUpdateDataModel,
} from "@application/model/webeditor/role";
import { EntityBase } from "../EntityBase";

export class Role extends EntityBase {
  private _name: string;
  private _label: string;
  private _order: number;

  get name() {
    return this._name;
  }
  get label() {
    return this._label;
  }
  get order() {
    return this._order;
  }

  private constructor(
    name: string,
    label: string,
    order: number,
    readonly moduleId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super("", id, createdAt, updatedAt);
    this._name = name;
    this._label = label;
    this._order = order;
  }

  static restore(
    id: string,
    name: string,
    label: string,
    order: number,
    moduleId: string,
    createdAt: Date,
    updatedAt: Date
  ): Role {
    return new Role(name, label, order, moduleId, id, createdAt, updatedAt);
  }

  static create(model: RoleCreateDataModel): Role {
    const role = new Role(model.name, model.label, model.order, model.moduleId);
    return role;
  }

  setOrder(order: number) {
    this._order = order;
  }

  update(roleData: RoleUpdateDataModel) {
    this.updateBase();
    this._name = roleData.name;
    this._label = roleData.label;
    this._order = roleData.order;
  }
}

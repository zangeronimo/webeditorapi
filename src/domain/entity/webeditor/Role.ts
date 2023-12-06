import {
  RoleCreateDataModel,
  RoleUpdateDataModel,
} from "@application/model/webeditor/role";

export class Role {
  private _id: string;
  private _name: string;
  private _label: string;
  private _order: number;
  private _updatedAt?: Date;

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get label() {
    return this._label;
  }
  get order() {
    return this._order;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    name: string,
    label: string,
    order: number,
    readonly moduleId: string
  ) {
    this._id = id;
    this._name = name;
    this._label = label;
    this._order = order;
  }

  static restore(
    id: string,
    name: string,
    label: string,
    order: number,
    moduleId: string
  ): Role {
    return new Role(id, name, label, order, moduleId);
  }

  static create(model: RoleCreateDataModel): Role {
    const role = new Role(
      crypto.randomUUID(),
      model.name,
      model.label,
      model.order,
      model.moduleId
    );
    return role;
  }

  setOrder(order: number) {
    this._order = order;
  }

  update(roleData: RoleUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = roleData.name;
    this._label = roleData.label;
    this._order = roleData.order;
  }
}

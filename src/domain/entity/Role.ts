export class Role {
  private _id: string;
  private _name: string;
  private _label: string;
  private _order: number;
  private _updatedAt?: Date;

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get label() {
    return this._label;
  }
  public get order() {
    return this._order;
  }
  public get updatedAt() {
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

  public static Restore(
    id: string,
    name: string,
    label: string,
    order: number,
    moduleId: string
  ): Role {
    return new Role(id, name, label, order, moduleId);
  }

  public static Create(
    name: string,
    label: string,
    order: number = 0,
    moduleId: string
  ): Role {
    const role = new Role(crypto.randomUUID(), name, label, order, moduleId);
    return role;
  }

  public SetOrder(order: number) {
    this._order = order;
  }
}

export abstract class EntityBase {
  private _id: string;
  private _companyId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  get id() {
    return this._id;
  }
  get companyId() {
    return this._companyId;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  constructor(
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    const dateNow = new Date();
    this._id = id ?? crypto.randomUUID();
    this._companyId = companyId;
    this._createdAt = createdAt ?? dateNow;
    this._updatedAt = updatedAt ?? dateNow;
  }

  protected updateBase() {
    this._updatedAt = new Date();
  }
}

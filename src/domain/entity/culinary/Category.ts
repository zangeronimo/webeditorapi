import {
  CategoryCreateDataModel,
  CategoryUpdateDataModel,
} from "@application/model/culinary/category";
import { ActiveEnum } from "@domain/enum";
import { Slug } from "@domain/valueObject/Slug";
import { EntityBase } from "../EntityBase";

export class Category extends EntityBase {
  private _slug: Slug;
  private _name: string;
  private _active: ActiveEnum;
  private _levelId: string;

  get slug() {
    return this._slug.value;
  }
  get name() {
    return this._name;
  }
  get active() {
    return this._active;
  }
  get levelId() {
    return this._levelId;
  }

  private constructor(
    slug: Slug,
    name: string,
    active: ActiveEnum,
    levelId: string,
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._slug = slug;
    this._name = name;
    this._active = active;
    this._levelId = levelId;
  }

  static restore(
    id: string,
    slug: string,
    name: string,
    active: ActiveEnum,
    levelId: string,
    companyId: string,
    createdAt: Date,
    updatedAt: Date
  ): Category {
    return new Category(
      Slug.restore(slug),
      name,
      active,
      levelId,
      companyId,
      id,
      createdAt,
      updatedAt
    );
  }

  static create(model: CategoryCreateDataModel, companyId: string): Category {
    const category = new Category(
      Slug.create(model.name),
      model.name,
      model.active,
      model.levelId,
      companyId
    );
    return category;
  }

  update(model: CategoryUpdateDataModel) {
    this.updateBase();
    this._slug = Slug.restore(model.slug);
    this._name = model.name;
    this._active = model.active;
    this._levelId = model.levelId;
  }
}

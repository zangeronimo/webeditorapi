import {
  LevelCreateDataModel,
  LevelUpdateDataModel,
} from "@application/model/culinary/level";
import { ActiveEnum } from "@domain/enum";
import { Slug } from "@domain/valueObject/Slug";

export class Level {
  private _id: string;
  private _slug: Slug;
  private _name: string;
  private _active: ActiveEnum;
  private _updatedAt?: Date;

  get id() {
    return this._id;
  }
  get slug() {
    return this._slug.value;
  }
  get name() {
    return this._name;
  }
  get active() {
    return this._active;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    slug: Slug,
    name: string,
    active: ActiveEnum,
    readonly companyId: string
  ) {
    this._id = id;
    this._slug = slug;
    this._name = name;
    this._active = active;
  }

  static restore(
    id: string,
    slug: string,
    name: string,
    active: ActiveEnum,
    companyId: string
  ): Level {
    return new Level(id, Slug.restore(slug), name, active, companyId);
  }

  static create(model: LevelCreateDataModel, companyId: string): Level {
    const level = new Level(
      crypto.randomUUID(),
      Slug.create(model.name),
      model.name,
      model.active,
      companyId
    );
    return level;
  }

  update(model: LevelUpdateDataModel) {
    this._updatedAt = new Date();
    this._slug = Slug.restore(model.slug);
    this._name = model.name;
    this._active = model.active;
  }
}

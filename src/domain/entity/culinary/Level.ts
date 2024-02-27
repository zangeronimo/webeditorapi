import {
  LevelCreateDataModel,
  LevelUpdateDataModel,
} from "@application/model/culinary/level";
import { ActiveEnum } from "@domain/enum";
import { Slug } from "@domain/valueObject/Slug";
import { EntityBase } from "../EntityBase";

export class Level extends EntityBase {
  private _slug: Slug;
  private _name: string;
  private _active: ActiveEnum;

  get slug() {
    return this._slug.value;
  }
  get name() {
    return this._name;
  }
  get active() {
    return this._active;
  }

  private constructor(
    slug: Slug,
    name: string,
    active: ActiveEnum,
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._slug = slug;
    this._name = name;
    this._active = active;
  }

  static restore(
    id: string,
    slug: string,
    name: string,
    active: ActiveEnum,
    companyId: string,
    createdAt: Date,
    updatedAt: Date
  ): Level {
    return new Level(
      Slug.restore(slug),
      name,
      active,
      companyId,
      id,
      createdAt,
      updatedAt
    );
  }

  static create(model: LevelCreateDataModel, companyId: string): Level {
    const level = new Level(
      Slug.create(model.name),
      model.name,
      model.active,
      companyId
    );
    return level;
  }

  update(model: LevelUpdateDataModel) {
    this.updateBase();
    this._slug = Slug.restore(model.slug);
    this._name = model.name;
    this._active = model.active;
  }
}

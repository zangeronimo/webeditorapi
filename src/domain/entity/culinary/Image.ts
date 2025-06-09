import { ActiveEnum } from "@domain/enum";
import { Slug } from "@domain/valueObject/Slug";
import { EntityBase } from "../EntityBase";

export class Image extends EntityBase {
  private _url: string;
  private _recipeId: string;
  private _active: ActiveEnum;

  get url() {
    return this._url;
  }
  get recipeId() {
    return this._recipeId;
  }
  get active() {
    return this._active;
  }

  private constructor(
    url: string,
    recipeId: string,
    active: ActiveEnum,
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._url = url;
    this._recipeId = recipeId;
    this._active = active;
  }

  static restore(
    id: string,
    url: string,
    recipeId: string,
    active: ActiveEnum,
    companyId: string,
    createdAt: Date,
    updatedAt: Date
  ): Image {
    return new Image(
      url,
      recipeId,
      active,
      companyId,
      id,
      createdAt,
      updatedAt
    );
  }

  static create(
    url: string,
    recipeId: string,
    companyId: string,
    id?: string
  ): Image {
    const image = new Image(url, recipeId, ActiveEnum.INACTIVE, companyId, id);
    return image;
  }

  update(active: ActiveEnum) {
    this.updateBase();
    this._active = active;
  }
}

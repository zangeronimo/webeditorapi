import {
  RatingCreateDataModel,
  RatingUpdateDataModel,
} from "@application/model/culinary/rating";
import { ActiveEnum } from "@domain/enum";

export class Rating {
  private _id: string;
  private _rate: number;
  private _comment: string;
  private _name?: string;
  private _active: ActiveEnum;
  private _recipeId: string;
  private _updatedAt?: Date;

  get id() {
    return this._id;
  }
  get rate() {
    return this._rate;
  }
  get comment() {
    return this._comment;
  }
  get name() {
    return this._name;
  }
  get active() {
    return this._active;
  }
  get recipeId() {
    return this._recipeId;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    rate: number,
    comment: string,
    active: ActiveEnum,
    recipeId: string,
    readonly companyId: string,
    name?: string,
    updatedAte?: Date
  ) {
    this._id = id;
    this._rate = rate;
    this._comment = comment;
    this._recipeId = recipeId;
    this._name = name;
    this._active = active;
    this._updatedAt = updatedAte;
  }

  static restore(
    id: string,
    rate: number,
    comment: string,
    active: ActiveEnum,
    recipeId: string,
    companyId: string,
    name?: string,
    updatedAt?: Date
  ): Rating {
    return new Rating(
      id,
      rate,
      comment,
      active,
      recipeId,
      companyId,
      name,
      updatedAt
    );
  }

  static create(model: RatingCreateDataModel, companyId: string): Rating {
    const rating = new Rating(
      crypto.randomUUID(),
      model.rate,
      model.comment,
      model.active,
      model.recipeId,
      companyId,
      model.name
    );
    return rating;
  }

  update(model: RatingUpdateDataModel) {
    this._updatedAt = new Date();
    this._rate = model.rate;
    this._comment = model.comment;
    this._name = model.name;
    this._active = model.active;
    this._recipeId = model.recipeId;
  }
}

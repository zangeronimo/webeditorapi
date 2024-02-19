import {
  RatingCreateDataModel,
  RatingUpdateDataModel,
} from "@application/model/culinary/rating";
import { ActiveEnum } from "@domain/enum";
import { EntityBase } from "../EntityBase";

export class Rating extends EntityBase {
  private _rate: number;
  private _comment: string;
  private _name?: string;
  private _active: ActiveEnum;
  private _recipeId: string;

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

  private constructor(
    rate: number,
    comment: string,
    active: ActiveEnum,
    recipeId: string,
    companyId: string,
    name?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._rate = rate;
    this._comment = comment;
    this._recipeId = recipeId;
    this._name = name;
    this._active = active;
  }

  static restore(
    id: string,
    rate: number,
    comment: string,
    active: ActiveEnum,
    recipeId: string,
    companyId: string,
    createdAt: Date,
    updatedAt: Date,
    name?: string
  ): Rating {
    return new Rating(
      rate,
      comment,
      active,
      recipeId,
      companyId,
      name,
      id,
      createdAt,
      updatedAt
    );
  }

  static create(model: RatingCreateDataModel, companyId: string): Rating {
    const rating = new Rating(
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
    this.updateBase();
    this._rate = model.rate;
    this._comment = model.comment;
    this._name = model.name;
    this._active = model.active;
    this._recipeId = model.recipeId;
  }
}

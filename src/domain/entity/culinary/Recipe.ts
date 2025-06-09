import {
  RecipeCreateDataModel,
  RecipeUpdateDataModel,
} from "@application/model/culinary/recipe";
import { ActiveEnum } from "@domain/enum";
import { Slug } from "@domain/valueObject/Slug";
import { EntityBase } from "../EntityBase";
import { Image } from "./Image";

export class Recipe extends EntityBase {
  private _slug: Slug;
  private _name: string;
  private _ingredients: string;
  private _preparation: string;
  private _moreInformation: string;
  private _images: Image[];
  private _active: ActiveEnum;
  private _categoryId: string;

  get slug() {
    return this._slug.value;
  }
  get name() {
    return this._name;
  }
  get ingredients() {
    return this._ingredients;
  }
  get preparation() {
    return this._preparation;
  }
  get moreInformation() {
    return this._moreInformation;
  }
  get images() {
    return this._images;
  }
  get active() {
    return this._active;
  }
  get categoryId() {
    return this._categoryId;
  }

  private constructor(
    slug: Slug,
    name: string,
    ingredients: string,
    preparation: string,
    moreInformation: string,
    images: Image[],
    active: ActiveEnum,
    categoryId: string,
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._slug = slug;
    this._name = name;
    this._ingredients = ingredients;
    this._preparation = preparation;
    this._moreInformation = moreInformation;
    this._images = images;
    this._active = active;
    this._categoryId = categoryId;
  }

  static restore(
    id: string,
    slug: string,
    name: string,
    ingredients: string,
    preparation: string,
    moreInformation: string,
    images: Image[],
    active: ActiveEnum,
    categoryId: string,
    companyId: string,
    createdAt: Date,
    updatedAt: Date
  ): Recipe {
    return new Recipe(
      Slug.restore(slug),
      name,
      ingredients,
      preparation,
      moreInformation,
      images,
      active,
      categoryId,
      companyId,
      id,
      createdAt,
      updatedAt
    );
  }

  static create(model: RecipeCreateDataModel, companyId: string): Recipe {
    const recipe = new Recipe(
      Slug.create(model.name),
      model.name,
      model.ingredients,
      model.preparation,
      model.moreInformation,
      [],
      model.active,
      model.categoryId,
      companyId
    );
    return recipe;
  }

  update(model: RecipeUpdateDataModel) {
    this.updateBase();
    this._slug = Slug.restore(model.slug);
    this._name = model.name;
    this._ingredients = model.ingredients;
    this._preparation = model.preparation;
    this._moreInformation = model.moreInformation;
    this._images = model.images;
    this._active = model.active;
    this._categoryId = model.categoryId;
  }
}

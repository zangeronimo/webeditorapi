import {
  RecipeCreateDataModel,
  RecipeUpdateDataModel,
} from "@application/model/culinary/recipe";
import { ActiveEnum } from "@domain/enum";
import { Slug } from "@domain/valueObject/Slug";

export class Recipe {
  private _id: string;
  private _slug: Slug;
  private _name: string;
  private _ingredients: string;
  private _preparation: string;
  private _active: ActiveEnum;
  private _categoryId: string;
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
  get ingredients() {
    return this._ingredients;
  }
  get preparation() {
    return this._preparation;
  }
  get active() {
    return this._active;
  }
  get categoryId() {
    return this._categoryId;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  private constructor(
    id: string,
    slug: Slug,
    name: string,
    ingredients: string,
    preparation: string,
    active: ActiveEnum,
    categoryId: string,
    readonly companyId: string,
    updatedAt?: Date
  ) {
    this._id = id;
    this._slug = slug;
    this._name = name;
    this._ingredients = ingredients;
    this._preparation = preparation;
    this._active = active;
    this._categoryId = categoryId;
    this._updatedAt = updatedAt;
  }

  static restore(
    id: string,
    slug: string,
    name: string,
    ingredients: string,
    preparation: string,
    active: ActiveEnum,
    categoryId: string,
    companyId: string,
    updatedAt: Date
  ): Recipe {
    return new Recipe(
      id,
      Slug.restore(slug),
      name,
      ingredients,
      preparation,
      active,
      categoryId,
      companyId,
      updatedAt
    );
  }

  static create(model: RecipeCreateDataModel, companyId: string): Recipe {
    const recipe = new Recipe(
      crypto.randomUUID(),
      Slug.create(model.name),
      model.name,
      model.ingredients,
      model.preparation,
      model.active,
      model.categoryId,
      companyId
    );
    return recipe;
  }

  update(model: RecipeUpdateDataModel) {
    this._updatedAt = new Date();
    this._slug = Slug.restore(model.slug);
    this._name = model.name;
    this._ingredients = model.ingredients;
    this._preparation = model.preparation;
    this._active = model.active;
    this._categoryId = model.categoryId;
  }
}

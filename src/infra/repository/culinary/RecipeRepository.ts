import { IRecipeRepository } from "@application/interface/repository/culinary";
import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { Recipe } from "@domain/entity/culinary";
import { Image } from "@domain/entity/culinary/Image";
import { ActiveEnum } from "@domain/enum";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getAllByCategory(
    categoryId: string,
    company: string
  ): Promise<Recipe[]> {
    const recipesData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, more_information, active, recipe_categories_id, webeditor_companies_id, created_at, updated_at
      from recipes
      where webeditor_companies_id = $1 and deleted_at is null and active = $2 and recipe_categories_id = $3
      order by name`,
      [company, ActiveEnum.ACTIVE, categoryId]
    );
    const recipes: Recipe[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllImages(recipesData[i].id, company);
      const recipe = Recipe.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].more_information,
        images,
        recipesData[i].active,
        recipesData[i].recipe_categories_id,
        recipesData[i].webeditor_companies_id,
        recipesData[i].created_at,
        recipesData[i].updated_at
      );
      recipes.push(recipe);
    }
    return recipes;
  }

  async getRecipesAsync(
    model: GetAllRecipesFilterModel,
    company: string
  ): Promise<Recipe[]> {
    let where =
      "webeditor_companies_id = $1 and deleted_at is null and active = $2";
    if (model.categoryId) {
      where += " and recipe_categories_id = $3";
    }
    if (model.search) {
      where += ` and (LOWER(UNACCENT(name)) like $4 or LOWER(UNACCENT(ingredients)) like $4 or LOWER(UNACCENT(preparation)) like $4)`;
    }
    const recipesData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, more_information, active, recipe_categories_id, webeditor_companies_id, created_at, updated_at
      from recipes
      where ${where}
      order by ${model.orderBy}
      limit $5`,
      [
        company,
        ActiveEnum.ACTIVE,
        model.categoryId,
        `%${model.search?.toLowerCase().noAccents()}%`,
        model.total,
      ]
    );
    const recipes: Recipe[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllImages(recipesData[i].id, company);
      const recipe = Recipe.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].more_information,
        images,
        recipesData[i].active,
        recipesData[i].recipe_categories_id,
        recipesData[i].webeditor_companies_id,
        recipesData[i].created_at,
        recipesData[i].updated_at
      );
      recipes.push(recipe);
    }
    return recipes;
  }

  async getWithImageAsync(
    model: GetAllWithImageFilterModel,
    company: string
  ): Promise<Recipe[]> {
    const orderBy = model.random ? " random()" : " r.created_at desc";
    let where =
      "r.webeditor_companies_id = $1 and r.deleted_at is null and r.active = $2";
    if (model.categoryId) {
      where += " and recipe_categories_id = $3";
    }
    if (model.search) {
      where += ` and (LOWER(UNACCENT(r.name)) like $4 or LOWER(UNACCENT(r.ingredients)) like $4 or LOWER(UNACCENT(r.preparation)) like $4)`;
    }
    const recipesData: any[] = await this.db.queryAsync(
      `select
        r.id, r.slug, r.name, r.ingredients, r.preparation, r.more_information, r.active, r.recipe_categories_id, r.webeditor_companies_id, r.created_at, r.updated_at
      from recipes r
      inner join recipe_images ri on ri.recipes_id=r.id and ri.active=$2 and ri.deleted_at is null and ri.webeditor_companies_id = $1
      where ${where}
      group by r.id
      order by ${orderBy}
      limit $5`,
      [
        company,
        ActiveEnum.ACTIVE,
        model.categoryId,
        `%${model.search?.toLowerCase().noAccents()}%`,
        model.total,
      ]
    );
    const recipes: Recipe[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllImages(recipesData[i].id, company);
      const recipe = Recipe.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].more_information,
        images,
        recipesData[i].active,
        recipesData[i].recipe_categories_id,
        recipesData[i].webeditor_companies_id,
        recipesData[i].created_at,
        recipesData[i].updated_at
      );
      recipes.push(recipe);
    }
    return recipes;
  }

  private async getAllImages(
    recipeId: string,
    company: string
  ): Promise<Image[]> {
    const imagesData: any[] = await this.db.queryAsync(
      `select
        id, url, recipes_id, active, webeditor_companies_id, created_at, updated_at
      from recipe_images
      where webeditor_companies_id = $1 and deleted_at is null and recipes_id = $2
      order by id DESC`,
      [company, recipeId]
    );
    const images: Image[] = [];
    for (let i = 0; i < imagesData.length; i++) {
      const image = Image.restore(
        imagesData[i].id,
        imagesData[i].url,
        imagesData[i].recipes_id,
        imagesData[i].active,
        imagesData[i].webeditor_companies_id,
        imagesData[i].created_at,
        imagesData[i].updated_at
      );
      images.push(image);
    }
    return images;
  }

  async getAllActiveImagesByRecipeId(
    recipeId: string,
    company: string
  ): Promise<string[]> {
    const imagesData: any[] = await this.db.queryAsync(
      `select
        url
      from recipe_images
      where webeditor_companies_id = $1 and deleted_at is null and active = $2 and recipes_id = $3
      order by created_at desc`,
      [company, ActiveEnum.ACTIVE, recipeId]
    );
    const images: string[] = [];
    for (let i = 0; i < imagesData.length; i++) {
      images.push(imagesData[i].url);
    }
    return images;
  }

  async getByIdAsync(id: string, company: string): Promise<Recipe | null> {
    const [recipeData] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, more_information, active, recipe_categories_id, webeditor_companies_id, created_at, updated_at
       from recipes
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    const images = await this.getAllImages(id, company);
    return recipeData
      ? Recipe.restore(
          recipeData.id,
          recipeData.slug,
          recipeData.name,
          recipeData.ingredients,
          recipeData.preparation,
          recipeData.more_information,
          images,
          recipeData.active,
          recipeData.recipe_categories_id,
          recipeData.webeditor_companies_id,
          recipeData.created_at,
          recipeData.updated_at
        )
      : null;
  }

  async getImageByIdAsync(id: string, company: string): Promise<Image | null> {
    const [imageData] = await this.db.queryAsync(
      `select
        id, url, active, recipes_id, webeditor_companies_id, created_at, updated_at
       from recipe_images
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return imageData
      ? Image.restore(
          imageData.id,
          imageData.url,
          imageData.recipes_id,
          imageData.active,
          imageData.webeditor_companies_id,
          imageData.created_at,
          imageData.updated_at
        )
      : null;
  }

  async getBySlugAsync(slug: string, company: string): Promise<Recipe | null> {
    const [recipeData] = await this.db.queryAsync(
      "select id, slug, name, ingredients, preparation, more_information, active, recipe_categories_id, webeditor_companies_id, created_at, updated_at from recipes where slug = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [slug, company]
    );
    const images = await this.getAllImages(recipeData.id, company);
    return recipeData
      ? Recipe.restore(
          recipeData.id,
          recipeData.slug,
          recipeData.name,
          recipeData.ingredients,
          recipeData.preparation,
          recipeData.more_information,
          images,
          recipeData.active,
          recipeData.recipe_categories_id,
          recipeData.webeditor_companies_id,
          recipeData.created_at,
          recipeData.updated_at
        )
      : null;
  }

  async getAllAsync(
    model: GetAllRecipeFilterModel,
    company: string
  ): Promise<{ itens: Recipe[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.slug) {
      where += ` and slug = $3`;
    }
    if (!!model.active) {
      where += ` and active = $4`;
    }
    if (!!model.categoryId) {
      where += ` and recipe_categories_id = $5`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from recipes where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.slug?.toLowerCase(),
        model.active,
        model.categoryId,
      ]
    );
    const recipesData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, more_information, active, recipe_categories_id, webeditor_companies_id, created_at, updated_at
      from recipes
      where ${where}
      order by ${ordenation}
      limit $6
      offset $7`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.slug?.toLowerCase(),
        model.active,
        model.categoryId,
        model.pageSize,
        offset,
      ]
    );
    const recipes: Recipe[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllImages(recipesData[i].id, company);
      const recipe = Recipe.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].more_information,
        images,
        recipesData[i].active,
        recipesData[i].recipe_categories_id,
        recipesData[i].webeditor_companies_id,
        recipesData[i].created_at,
        recipesData[i].updated_at
      );
      recipes.push(recipe);
    }
    return { itens: recipes, total: total.count };
  }

  async deleteAsync(recipe: Recipe, date: Date): Promise<Recipe> {
    await this.db.queryAsync(
      "update recipes set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [recipe.id, recipe.companyId, date]
    );
    return recipe;
  }

  async deleteImageAsync(image: Image, date: Date): Promise<void> {
    await this.db.queryAsync(
      "update recipe_images set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [image.id, image.companyId, date]
    );
  }

  async updateAsync(recipe: Recipe): Promise<Recipe> {
    await this.db.queryAsync(
      "update recipes set slug=$3, name=$4, ingredients=$5, preparation=$6, more_information=$7, active=$8, recipe_categories_id=$9, updated_at=$10 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        recipe.id,
        recipe.companyId,
        recipe.slug,
        recipe.name,
        recipe.ingredients,
        recipe.preparation,
        recipe.moreInformation,
        recipe.active,
        recipe.categoryId,
        recipe.updatedAt,
      ]
    );
    for (let i = 0; i < recipe.images?.length; i++) {
      if (recipe.images[i].id) {
        await this.db.queryAsync(
          "update recipe_images set active=$4, updated_at=$5 where id = $1 and recipes_id=$2 and webeditor_companies_id = $3 and deleted_at is null",
          [
            recipe.images[i].id,
            recipe.id,
            recipe.companyId,
            recipe.images[i].active,
            recipe.images[i].updatedAt,
          ]
        );
      } else {
        await this.db.queryAsync(
          "insert into recipe_images (url, recipes_id, webeditor_companies_id, active) values ($1, $2, $3, $4)",
          [
            recipe.images[i].url,
            recipe.id,
            recipe.companyId,
            recipe.images[i].active,
          ]
        );
      }
    }
    return recipe;
  }

  async saveAsync(recipe: Recipe): Promise<Recipe> {
    await this.db.queryAsync(
      "insert into recipes (id, slug, name, ingredients, preparation, more_information, active, recipe_categories_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        recipe.id,
        recipe.slug,
        recipe.name,
        recipe.ingredients,
        recipe.preparation,
        recipe.moreInformation,
        recipe.active,
        recipe.categoryId,
        recipe.companyId,
      ]
    );
    return recipe;
  }
}

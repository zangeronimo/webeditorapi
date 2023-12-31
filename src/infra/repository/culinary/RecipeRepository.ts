import { IRecipeRepository } from "@application/interface/repository/culinary";
import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { Recipe } from "@domain/entity/culinary";
import { ActiveEnum } from "@domain/enum";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getNewsAsync(total: number, company: string): Promise<Recipe[]> {
    const recipesData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, active, recipe_categories_id, webeditor_companies_id
      from recipes
      where webeditor_companies_id = $1 and deleted_at is null and active = $2
      order by created_at desc
      limit $3`,
      [company, ActiveEnum.ACTIVE, total]
    );
    const recipes: Recipe[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const recipe = Recipe.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].active,
        recipesData[i].recipe_categories_id,
        recipesData[i].webeditor_companies_id
      );
      recipes.push(recipe);
    }
    return recipes;
  }

  async getWithImageAsync(total: number, company: string): Promise<Recipe[]> {
    const recipesData: any[] = await this.db.queryAsync(
      `select
        r.id, r.slug, r.name, r.ingredients, r.preparation, r.active, r.recipe_categories_id, r.webeditor_companies_id
      from recipes r
      inner join recipe_images ri on ri.recipes_id=r.id and ri.active=$2 and ri.deleted_at is null and ri.webeditor_companies_id = $1
      where r.webeditor_companies_id = $1 and r.deleted_at is null and r.active = $2
      group by r.id
      order by r.created_at desc
      limit $3`,
      [company, ActiveEnum.ACTIVE, total]
    );
    const recipes: Recipe[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const recipe = Recipe.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].active,
        recipesData[i].recipe_categories_id,
        recipesData[i].webeditor_companies_id
      );
      recipes.push(recipe);
    }
    return recipes;
  }

  async getAllImagesByRecipeId(
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
        id, slug, name, ingredients, preparation, active, recipe_categories_id, webeditor_companies_id
       from recipes
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return recipeData
      ? Recipe.restore(
          recipeData.id,
          recipeData.slug,
          recipeData.name,
          recipeData.ingredients,
          recipeData.preparation,
          recipeData.active,
          recipeData.recipe_categories_id,
          recipeData.webeditor_companies_id
        )
      : null;
  }

  async getBySlugAsync(slug: string, company: string): Promise<Recipe | null> {
    const [recipeData] = await this.db.queryAsync(
      "select id, slug, name, ingredients, preparation, active, recipe_categories_id, webeditor_companies_id from recipes where slug = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [slug, company]
    );
    return recipeData
      ? Recipe.restore(
          recipeData.id,
          recipeData.slug,
          recipeData.name,
          recipeData.ingredients,
          recipeData.preparation,
          recipeData.active,
          recipeData.recipe_categories_id,
          recipeData.webeditor_companies_id
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
        id, slug, name, ingredients, preparation, active, recipe_categories_id, webeditor_companies_id
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
      const recipe = Recipe.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].active,
        recipesData[i].recipe_categories_id,
        recipesData[i].webeditor_companies_id
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

  async updateAsync(recipe: Recipe): Promise<Recipe> {
    await this.db.queryAsync(
      "update recipes set slug=$3, name=$4, ingredients=$5, preparation=$6, active=$7, recipe_categories_id=$8, updated_at=$9 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        recipe.id,
        recipe.companyId,
        recipe.slug,
        recipe.name,
        recipe.ingredients,
        recipe.preparation,
        recipe.active,
        recipe.categoryId,
        recipe.updatedAt,
      ]
    );
    return recipe;
  }

  async saveAsync(recipe: Recipe): Promise<Recipe> {
    await this.db.queryAsync(
      "insert into recipes (id, slug, name, ingredients, preparation, active, recipe_categories_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        recipe.id,
        recipe.slug,
        recipe.name,
        recipe.ingredients,
        recipe.preparation,
        recipe.active,
        recipe.categoryId,
        recipe.companyId,
      ]
    );
    return recipe;
  }
}

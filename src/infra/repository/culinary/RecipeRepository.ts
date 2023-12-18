import { IRecipeRepository } from "@application/interface/repository/culinary";
import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { Recipe } from "@domain/entity/culinary";
import { DbContext } from "@infra/context";

export class RecipeRepository implements IRecipeRepository {
  constructor(readonly db: DbContext) {}

  async getByIdAsync(id: string, company: string): Promise<Recipe | null> {
    const [recipeData] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, active, recipe_categories_id, webeditor_companies_id
       from recipe_recipes
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
      "select id, slug, name, ingredients, preparation, active, recipe_categories_id, webeditor_companies_id from recipe_recipes where slug = $1 and webeditor_companies_id = $2 and deleted_at is null",
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
      `select count(*) from recipe_recipes where ${where}`,
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
      from recipe_recipes
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
      "update recipe_recipes set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [recipe.id, recipe.companyId, date]
    );
    return recipe;
  }

  async updateAsync(recipe: Recipe): Promise<Recipe> {
    await this.db.queryAsync(
      "update recipe_recipes set slug=$3, name=$4, ingredients=$5, preparation=$6, active=$7, recipe_categories_id=$8, updated_at=$9 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
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
      "insert into recipe_recipes (id, slug, name, ingredients, preparation, active, recipe_categories_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6, $7, $8)",
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

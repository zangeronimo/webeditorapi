import { IRecipeRecipesRepository } from "@application/interface/repository/culinary/IRecipeRecipesRepository";
import { GetAllRecipeFilterModel } from "@application/model/culinary/recipe";
import { GetAllRecipesFilterModel } from "@application/model/culinary/recipe/GetAllRecipesFilterModel";
import { GetAllWithImageFilterModel } from "@application/model/culinary/recipe/GetAllWithImageFilterModel";
import { Image } from "@domain/entity/culinary/Image";
import { RecipeRecipes } from "@domain/entity/culinary/RecipeRecipes";
import { ActiveEnum } from "@domain/enum";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeRecipesRepository implements IRecipeRecipesRepository {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getAllByCategory(
    levelId: string,
    company: string
  ): Promise<RecipeRecipes[]> {
    const recipesData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, active, recipe_levels_id, webeditor_companies_id, created_at, updated_at
      from recipes
      where webeditor_companies_id = $1 and deleted_at is null and active = $2 and recipe_levels_id = $3
      order by name`,
      [company, ActiveEnum.ACTIVE, levelId]
    );
    const recipes: RecipeRecipes[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllImages(recipesData[i].id, company);
      const recipe = RecipeRecipes.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].short_description,
        recipesData[i].full_description,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].yield_total,
        recipesData[i].prep_time,
        recipesData[i].cook_time,
        recipesData[i].rest_time,
        recipesData[i].difficulty,
        recipesData[i].tools,
        recipesData[i].notes,
        recipesData[i].image_url,
        recipesData[i].meta_title,
        recipesData[i].meta_description,
        recipesData[i].keywords,
        recipesData[i].schema_jsonld,
        recipesData[i].related_recipe_ids,
        recipesData[i].views,
        recipesData[i].likes,
        recipesData[i].active,
        recipesData[i].published_at,
        images,
        recipesData[i].recipe_levels_id,
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
  ): Promise<RecipeRecipes[]> {
    let where =
      "webeditor_companies_id = $1 and deleted_at is null and active = $2";
    if (model.levelId) {
      where += " and recipe_levels_id = $3";
    }
    if (model.search) {
      where += ` and (LOWER(UNACCENT(name)) like $4 or LOWER(UNACCENT(ingredients)) like $4 or LOWER(UNACCENT(preparation)) like $4)`;
    }
    const recipesData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, active, recipe_levels_id, webeditor_companies_id, created_at, updated_at
      from recipe_recipes
      where ${where}
      order by ${model.orderBy}
      limit $5`,
      [
        company,
        ActiveEnum.ACTIVE,
        model.levelId,
        `%${model.search?.toLowerCase().noAccents()}%`,
        model.total,
      ]
    );
    const recipes: RecipeRecipes[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllImages(recipesData[i].id, company);
      const recipe = RecipeRecipes.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].short_description,
        recipesData[i].full_description,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].yield_total,
        recipesData[i].prep_time,
        recipesData[i].cook_time,
        recipesData[i].rest_time,
        recipesData[i].difficulty,
        recipesData[i].tools,
        recipesData[i].notes,
        recipesData[i].image_url,
        recipesData[i].meta_title,
        recipesData[i].meta_description,
        recipesData[i].keywords,
        recipesData[i].schema_jsonld,
        recipesData[i].related_recipe_ids,
        recipesData[i].views,
        recipesData[i].likes,
        recipesData[i].active,
        recipesData[i].published_at,
        images,
        recipesData[i].recipe_levels_id,
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
  ): Promise<RecipeRecipes[]> {
    const orderBy = model.random ? " random()" : " r.created_at desc";
    let where =
      "r.webeditor_companies_id = $1 and r.deleted_at is null and r.active = $2";
    if (model.levelId) {
      where += " and recipe_levels_id = $3";
    }
    if (model.search) {
      where += ` and (LOWER(UNACCENT(r.name)) like $4 or LOWER(UNACCENT(r.ingredients)) like $4 or LOWER(UNACCENT(r.preparation)) like $4)`;
    }
    const recipesData: any[] = await this.db.queryAsync(
      `select
        r.id, r.slug, r.name, r.ingredients, r.preparation, r.active, r.recipe_levels_id, r.webeditor_companies_id, r.created_at, r.updated_at
      from recipe_recipes r
      inner join recipe_images ri on ri.recipes_id=r.id and ri.active=$2 and ri.deleted_at is null and ri.webeditor_companies_id = $1
      where ${where}
      group by r.id
      order by ${orderBy}
      limit $5`,
      [
        company,
        ActiveEnum.ACTIVE,
        model.levelId,
        `%${model.search?.toLowerCase().noAccents()}%`,
        model.total,
      ]
    );
    const recipes: RecipeRecipes[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllImages(recipesData[i].id, company);
      const recipe = RecipeRecipes.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].short_description,
        recipesData[i].full_description,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].yield_total,
        recipesData[i].prep_time,
        recipesData[i].cook_time,
        recipesData[i].rest_time,
        recipesData[i].difficulty,
        recipesData[i].tools,
        recipesData[i].notes,
        recipesData[i].image_url,
        recipesData[i].meta_title,
        recipesData[i].meta_description,
        recipesData[i].keywords,
        recipesData[i].schema_jsonld,
        recipesData[i].related_recipe_ids,
        recipesData[i].views,
        recipesData[i].likes,
        recipesData[i].active,
        recipesData[i].published_at,
        images,
        recipesData[i].recipe_levels_id,
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

  async getByIdAsync(
    id: string,
    company: string
  ): Promise<RecipeRecipes | null> {
    const [recipeData] = await this.db.queryAsync(
      `select
        id,
        slug,
        name,
        short_description,
        full_description,
        ingredients,
        preparation,
        tools,
        notes,
        yield_total,
        prep_time,
        cook_time,
        rest_time,
        difficulty,
        meta_title,
        meta_description,
        keywords,
        image_url,
        active,
        recipe_levels_id,
        webeditor_companies_id,
        created_at,
        updated_at
       from recipe_recipes
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    const images = await this.getAllImages(id, company);
    return recipeData
      ? RecipeRecipes.restore(
          recipeData.id,
          recipeData.slug,
          recipeData.name,
          recipeData.short_description,
          recipeData.full_description,
          recipeData.ingredients,
          recipeData.preparation,
          recipeData.yield_total,
          recipeData.prep_time,
          recipeData.cook_time,
          recipeData.rest_time,
          recipeData.difficulty,
          recipeData.tools,
          recipeData.notes,
          recipeData.image_url,
          recipeData.meta_title,
          recipeData.meta_description,
          recipeData.keywords,
          recipeData.schema_jsonld,
          recipeData.related_recipe_ids,
          recipeData.views,
          recipeData.likes,
          recipeData.active,
          recipeData.published_at,
          images,
          recipeData.recipe_levels_id,
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

  async getBySlugAsync(
    slug: string,
    company: string
  ): Promise<RecipeRecipes | null> {
    const [recipeData] = await this.db.queryAsync(
      "select id, slug, name, ingredients, preparation, active, recipe_levels_id, webeditor_companies_id, created_at, updated_at from recipe_recipes where slug = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [slug, company]
    );
    const images = await this.getAllImages(recipeData?.id, company);
    return recipeData
      ? RecipeRecipes.restore(
          recipeData.id,
          recipeData.slug,
          recipeData.name,
          recipeData.short_description,
          recipeData.full_description,
          recipeData.ingredients,
          recipeData.preparation,
          recipeData.yield_total,
          recipeData.prep_time,
          recipeData.cook_time,
          recipeData.rest_time,
          recipeData.difficulty,
          recipeData.tools,
          recipeData.notes,
          recipeData.image_url,
          recipeData.meta_title,
          recipeData.meta_description,
          recipeData.keywords,
          recipeData.schema_jsonld,
          recipeData.related_recipe_ids,
          recipeData.views,
          recipeData.likes,
          recipeData.active,
          recipeData.published_at,
          images,
          recipeData.recipe_levels_id,
          recipeData.webeditor_companies_id,
          recipeData.created_at,
          recipeData.updated_at
        )
      : null;
  }

  async getAllAsync(
    model: GetAllRecipeFilterModel,
    company: string
  ): Promise<{ itens: RecipeRecipes[]; total: number }> {
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
    if (!!model.levelId) {
      where += ` and recipe_levels_id = $5`;
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
        model.levelId,
      ]
    );
    const recipesData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, ingredients, preparation, active, recipe_levels_id, webeditor_companies_id, created_at, updated_at
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
        model.levelId,
        model.pageSize,
        offset,
      ]
    );
    const recipes: RecipeRecipes[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllImages(recipesData[i].id, company);
      const recipe = RecipeRecipes.restore(
        recipesData[i].id,
        recipesData[i].slug,
        recipesData[i].name,
        recipesData[i].short_description,
        recipesData[i].full_description,
        recipesData[i].ingredients,
        recipesData[i].preparation,
        recipesData[i].yield_total,
        recipesData[i].prep_time,
        recipesData[i].cook_time,
        recipesData[i].rest_time,
        recipesData[i].difficulty,
        recipesData[i].tools,
        recipesData[i].notes,
        recipesData[i].image_url,
        recipesData[i].meta_title,
        recipesData[i].meta_description,
        recipesData[i].keywords,
        recipesData[i].schema_jsonld,
        recipesData[i].related_recipe_ids,
        recipesData[i].views,
        recipesData[i].likes,
        recipesData[i].active,
        recipesData[i].published_at,
        images,
        recipesData[i].recipe_levels_id,
        recipesData[i].webeditor_companies_id,
        recipesData[i].created_at,
        recipesData[i].updated_at
      );
      recipes.push(recipe);
    }
    return { itens: recipes, total: total.count };
  }

  async deleteAsync(recipe: RecipeRecipes, date: Date): Promise<RecipeRecipes> {
    await this.db.queryAsync(
      "update recipe_recipes set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
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

  async updateAsync(recipe: RecipeRecipes): Promise<RecipeRecipes> {
    await this.db.queryAsync(
      `update
        recipe_recipes
      set
        slug=$3,
        name=$4,
        short_description=$5,
        full_description=$6,
        ingredients=$7,
        preparation=$8,
        tools=$9,
        notes=$10,
        yield_total=$11,
        prep_time=$12,
        cook_time=$13,
        rest_time=$14,
        difficulty=$15,
        meta_title=$16,
        meta_description=$17,
        keywords=$18,
        active=$19,
        recipe_levels_id=$20,
        image_url=$21,
        updated_at=$22,
        schema_jsonld=$23
      where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [
        recipe.id,
        recipe.companyId,
        recipe.slug,
        recipe.name,
        recipe.shortDescription,
        recipe.fullDescription,
        recipe.ingredients,
        recipe.preparation,
        recipe.tools,
        recipe.notes,
        recipe.yieldTotal,
        recipe.prepTime,
        recipe.cookTime,
        recipe.restTime,
        recipe.difficulty,
        recipe.metaTitle,
        recipe.metaDescription,
        recipe.keywords,
        recipe.active,
        recipe.levelId,
        recipe.imageUrl,
        recipe.updatedAt,
        recipe.schemaJsonld,
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

  async saveAsync(recipe: RecipeRecipes): Promise<RecipeRecipes> {
    await this.db.queryAsync(
      `insert into recipe_recipes
        (id,
         slug,
         name,
         short_description,
         full_description,
         ingredients,
         preparation,
         tools,
         notes,
         yield_total,
         prep_time,
         cook_time,
         rest_time,
         difficulty,
         meta_title,
         meta_description,
         keywords,
         active,
         recipe_levels_id,
         webeditor_companies_id,
         schema_jsonld)
      values
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`,
      [
        recipe.id,
        recipe.slug,
        recipe.name,
        recipe.shortDescription,
        recipe.fullDescription,
        recipe.ingredients,
        recipe.preparation,
        recipe.tools,
        recipe.notes,
        recipe.yieldTotal,
        recipe.prepTime,
        recipe.cookTime,
        recipe.restTime,
        recipe.difficulty,
        recipe.metaTitle,
        recipe.metaDescription,
        recipe.keywords,
        recipe.active,
        recipe.levelId,
        recipe.companyId,
        recipe.schemaJsonld,
      ]
    );
    return recipe;
  }
}

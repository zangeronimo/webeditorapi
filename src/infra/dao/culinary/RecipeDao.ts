import { IRecipeDao } from "@application/interface/dao/culinary/IRecipeDao";
import { RecipeGetBySearchDao } from "@application/model/web/culinary/RecipeBySearchDao";
import { RecipeGetAllDao } from "@application/model/web/culinary/RecipeGetAllDao";
import { RecipeDto } from "@domain/dto/web/culinary/RecipeDto";
import { RecipeWithImagesDto } from "@domain/dto/web/culinary/RecipeWithImagesDto";
import { ActiveEnum } from "@domain/enum";
import { Slug } from "@domain/valueObject/Slug";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeDao implements IRecipeDao {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getAllAsync(
    model: RecipeGetAllDao,
    company: string
  ): Promise<RecipeWithImagesDto[]> {
    // const orderBy = " r.updated_at desc";
    const orderBy = " random()";
    let where =
      "r.webeditor_companies_id = $1 and r.deleted_at is null and r.active=$2";
    if (model.withImage) where += " and r.image_url is not null";
    const recipesData: any[] = await this.db.queryAsync(
      `select
        r.id, r.slug, r.name, r.prep_time, r.cook_time, r.rest_time, r.difficulty, r.short_description, r.image_url
      from recipe_recipes r
      where ${where}
      group by r.id
      order by ${orderBy}
      limit $3`,
      [company, ActiveEnum.ACTIVE, model.total]
    );
    const recipes: RecipeWithImagesDto[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const recipeDto = new RecipeWithImagesDto(recipesData[i]);
      recipes.push(recipeDto);
    }
    return recipes;
  }

  async getBySlugAsync(slug: Slug, company: string): Promise<RecipeDto | null> {
    let where =
      "r.webeditor_companies_id = $1 and r.deleted_at is null and r.active=$2 and r.slug=$3";
    const [recipeData] = await this.db.queryAsync(
      `select
        r.id,
        r.slug,
        r.name,
        r.short_description,
        r.full_description,
        r.ingredients,
        r.preparation,
        r.yield_total,
        r.prep_time,
        r.cook_time,
        r.rest_time,
        r.difficulty,
        r.tools,
        r.notes,
        r.image_url,
        r.meta_title,
        r.meta_description,
        r.keywords,
        r.schema_jsonld,
        r.views,
        r.likes,
        r.published_at
      from recipe_recipes r
      where ${where}
      group by r.id`,
      [company, ActiveEnum.ACTIVE, slug.value]
    );
    return recipeData ? new RecipeDto(recipeData) : null;
  }

  async getByIdAsync(id: string, company: string): Promise<RecipeDto | null> {
    let where =
      "r.webeditor_companies_id = $1 and r.deleted_at is null and r.active=$2 and r.id=$3";
    const [recipeData] = await this.db.queryAsync(
      `select
        r.id,
        r.slug,
        r.name,
        r.short_description,
        r.full_description,
        r.ingredients,
        r.preparation,
        r.yield_total,
        r.prep_time,
        r.cook_time,
        r.rest_time,
        r.difficulty,
        r.tools,
        r.notes,
        r.image_url,
        r.meta_title,
        r.meta_description,
        r.keywords,
        r.schema_jsonld,
        r.views,
        r.likes,
        r.published_at
      from recipe_recipes r
      where ${where}
      group by r.id`,
      [company, ActiveEnum.ACTIVE, id]
    );
    return recipeData ? new RecipeDto(recipeData) : null;
  }

  async getByLevelSlugAsync(
    level: Slug,
    company: string
  ): Promise<RecipeDto[]> {
    let where =
      "r.webeditor_companies_id = $1 and r.deleted_at is null and r.active=$2";
    if (level.value) where += " and l.slug=$3";
    const recipesData = await this.db.queryAsync(
      `select
        r.id,
        r.slug,
        r.name,
        r.short_description,
        r.full_description,
        r.ingredients,
        r.preparation,
        r.yield_total,
        r.prep_time,
        r.cook_time,
        r.rest_time,
        r.difficulty,
        r.tools,
        r.notes,
        r.image_url,
        r.meta_title,
        r.meta_description,
        r.keywords,
        r.schema_jsonld,
        r.views,
        r.likes,
        r.published_at
      from recipe_recipes r
      inner join recipe_levels l on l.id = r.recipe_levels_id
      where ${where}
      group by r.id`,
      [company, ActiveEnum.ACTIVE, level.value]
    );
    const recipes: RecipeDto[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const recipeDto = new RecipeDto(recipesData[i]);
      recipes.push(recipeDto);
    }
    return recipes;
  }

  async getBySearchAsync(
    model: RecipeGetBySearchDao,
    company: string
  ): Promise<RecipeDto[]> {
    if (!model.validate()) return [];
    const levelId = model.level ? ` and (r.recipe_levels_id = $4)` : "";
    const time = model.time
      ? ` and (r.prep_time + r.cook_time + r.rest_time <= $5)`
      : "";
    const difficulty = model.difficulty
      ? ` and (LOWER(UNACCENT(r.difficulty)) = $6)`
      : "";
    let where = `r.webeditor_companies_id = $1 and
       r.deleted_at is null and
       r.active=$2 and
       ((LOWER(UNACCENT(r.name)) like $3 or LOWER(UNACCENT(r.ingredients)) like $3) ${levelId} ${time} ${difficulty})`;
    const recipesData = await this.db.queryAsync(
      `select
        r.id,
        r.slug,
        r.name,
        r.short_description,
        r.full_description,
        r.ingredients,
        r.preparation,
        r.yield_total,
        r.prep_time,
        r.cook_time,
        r.rest_time,
        r.difficulty,
        r.tools,
        r.notes,
        r.image_url,
        r.meta_title,
        r.meta_description,
        r.keywords,
        r.schema_jsonld,
        r.views,
        r.likes,
        r.published_at
      from recipe_recipes r
      inner join recipe_levels c on c.id = r.recipe_levels_id
      where ${where}
      group by r.id
      order by random()
      limit 10`,
      [
        company,
        ActiveEnum.ACTIVE,
        `%${model.q?.toLowerCase().noAccents()}%`,
        model.level,
        +model.time,
        `${model.difficulty?.toLowerCase().noAccents()}`,
      ]
    );
    const recipes: RecipeDto[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const recipeDto = new RecipeDto(recipesData[i]);
      recipes.push(recipeDto);
    }
    return recipes;
  }

  async getMostAccessedAsync(company: string): Promise<RecipeDto[]> {
    let where = `r.webeditor_companies_id = $1 and
       r.deleted_at is null and
       r.active=$2`;

    const recipesData = await this.db.queryAsync(
      `select
        r.id,
        r.slug,
        r.name,
        r.short_description,
        r.full_description,
        r.ingredients,
        r.preparation,
        r.yield_total,
        r.prep_time,
        r.cook_time,
        r.rest_time,
        r.difficulty,
        r.tools,
        r.notes,
        r.image_url,
        r.meta_title,
        r.meta_description,
        r.keywords,
        r.schema_jsonld,
        r.views,
        r.likes,
        r.published_at
      from recipe_recipes r
      where ${where}
      group by r.id
      order by r.views DESC
      limit 10`,
      [company, ActiveEnum.ACTIVE]
    );
    const recipes: RecipeDto[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const recipeDto = new RecipeDto(recipesData[i]);
      recipes.push(recipeDto);
    }
    return recipes;
  }

  async getRatingByRecipeidAsync(
    recipeId: string,
    company: string
  ): Promise<number> {
    const ratingData: { rate: number }[] = await this.db.queryAsync(
      `select
        rate
      from recipe_ratings
      where webeditor_companies_id = $1 and deleted_at is null and active = $2 and recipes_id = $3 order by recipes_id`,
      [company, ActiveEnum.ACTIVE, recipeId]
    );
    const total = ratingData
      .map((rate) => rate.rate)
      .reduce((rate: number, total: number) => rate + total, 0);
    return total ? total / ratingData.length : 0;
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

  async updateAsync(
    id: string,
    views: number,
    companyId: string
  ): Promise<void> {
    await this.db.queryAsync(
      "update recipe_recipes set views=$2 where id=$1 and webeditor_companies_id=$3 and deleted_at is null",
      [id, views, companyId]
    );
  }
}

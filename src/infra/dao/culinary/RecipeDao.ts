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
        r.id, r.slug, r.name, r.short_description, r.image_url
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

  async getBySearchAsync(
    model: RecipeGetBySearchDao,
    company: string
  ): Promise<RecipeDto[]> {
    if (!model.validate()) return [];
    const category = model.category ? ` and (c.recipe_levels_id = $4)` : "";
    const time = model.time
      ? ` and (r.prep_time + r.cook_time + r.rest_time <= $5)`
      : "";
    const difficulty = model.difficulty
      ? ` and (LOWER(UNACCENT(r.difficulty)) = $6)`
      : "";
    let where = `r.webeditor_companies_id = $1 and
       r.deleted_at is null and
       r.active=$2 and
       ((LOWER(UNACCENT(r.name)) like $3 or LOWER(UNACCENT(r.ingredients)) like $3) ${category} ${time} ${difficulty})`;

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
      inner join recipe_categories c on c.id = r.recipe_categories_id
      where ${where}
      group by r.id
      order by random()
      limit 10`,
      [
        company,
        ActiveEnum.ACTIVE,
        `%${model.q?.toLowerCase().noAccents()}%`,
        model.category,
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
}

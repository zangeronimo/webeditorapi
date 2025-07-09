import { IRatingRepository } from "@application/interface/repository/culinary";
import { IRecipesRatingRepository } from "@application/interface/repository/culinary/IRecipesRatingRepository";
import { GetAllRatingFilterModel } from "@application/model/culinary/rating";
import { Rating } from "@domain/entity/culinary";
import { ActiveEnum } from "@domain/enum";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipesRatingRepository implements IRecipesRatingRepository {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getByIdAsync(id: string, company: string): Promise<Rating | null> {
    const [ratingData] = await this.db.queryAsync(
      `select
        id, rate, comment, name, active, recipe_recipes_id, webeditor_companies_id, created_at, updated_at
       from recipe_recipes_ratings
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return ratingData
      ? Rating.restore(
          ratingData.id,
          ratingData.rate,
          ratingData.comment,
          ratingData.active,
          ratingData.recipe_recipes_id,
          ratingData.webeditor_companies_id,
          ratingData.created_at,
          ratingData.update_at,
          ratingData.name
        )
      : null;
  }

  async getBySlugAsync(slug: string, company: string): Promise<Rating | null> {
    const [ratingData] = await this.db.queryAsync(
      "select id, rate, comment, name, active, recipe_recipes_id, webeditor_companies_id, created_at, updated_at from recipe_recipes_ratings where slug = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [slug, company]
    );
    return ratingData
      ? Rating.restore(
          ratingData.id,
          ratingData.rate,
          ratingData.comment,
          ratingData.active,
          ratingData.recipe_recipes_id,
          ratingData.webeditor_companies_id,
          ratingData.created_at,
          ratingData.updated_at,
          ratingData.name
        )
      : null;
  }

  async getAllAsync(
    model: GetAllRatingFilterModel,
    company: string
  ): Promise<{ itens: Rating[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.active) {
      where += ` and active = $3`;
    }
    if (!!model.recipeId) {
      where += ` and recipe_recipes_id = $4`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from recipe_recipes_ratings where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.active,
        model.recipeId,
      ]
    );
    const ratingsData: any[] = await this.db.queryAsync(
      `select
        id, rate, comment, name, active, recipe_recipes_id, webeditor_companies_id, created_at, updated_at
      from recipe_recipes_ratings
      where ${where}
      order by ${ordenation}
      limit $5
      offset $6`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.active,
        model.recipeId,
        model.pageSize,
        offset,
      ]
    );
    const ratings: Rating[] = [];
    for (let i = 0; i < ratingsData.length; i++) {
      const rating = Rating.restore(
        ratingsData[i].id,
        ratingsData[i].rate,
        ratingsData[i].comment,
        ratingsData[i].active,
        ratingsData[i].recipe_recipes_id,
        ratingsData[i].webeditor_companies_id,
        ratingsData[i].created_at,
        ratingsData[i].updated_at,
        ratingsData[i].name
      );
      ratings.push(rating);
    }
    return { itens: ratings, total: total.count };
  }

  async deleteAsync(rating: Rating, date: Date): Promise<Rating> {
    await this.db.queryAsync(
      "update recipe_recipes_ratings set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [rating.id, rating.companyId, date]
    );
    return rating;
  }

  async updateAsync(rating: Rating): Promise<Rating> {
    await this.db.queryAsync(
      "update recipe_recipes_ratings set rate=$3, comment=$4, name=$5, active=$6, recipe_recipes_id=$7, updated_at=$8 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        rating.id,
        rating.companyId,
        rating.rate,
        rating.comment,
        rating.name,
        rating.active,
        rating.recipeId,
        rating.updatedAt,
      ]
    );
    return rating;
  }

  async saveAsync(rating: Rating): Promise<Rating> {
    await this.db.queryAsync(
      "insert into recipe_recipes_ratings (id, rate, comment, name, active, recipe_recipes_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        rating.id,
        rating.rate,
        rating.comment,
        rating.name,
        rating.active,
        rating.recipeId,
        rating.companyId,
      ]
    );
    return rating;
  }

  async getAllByRecipeAsync(
    recipeid: string,
    company: string
  ): Promise<Rating[]> {
    let where =
      "webeditor_companies_id = $1 and recipe_recipes_id = $2 and active = $3 and deleted_at is null";
    const ratingsData: any[] = await this.db.queryAsync(
      `select
        id, rate, comment, name, active, recipe_recipes_id, webeditor_companies_id, created_at, updated_at
      from recipe_recipes_ratings
      where ${where}
      order by updated_at desc`,
      [company, recipeid, ActiveEnum.ACTIVE]
    );
    const ratings: Rating[] = [];
    for (let i = 0; i < ratingsData.length; i++) {
      const rating = Rating.restore(
        ratingsData[i].id,
        ratingsData[i].rate,
        ratingsData[i].comment,
        ratingsData[i].active,
        ratingsData[i].recipe_recipes_id,
        ratingsData[i].webeditor_companies_id,
        ratingsData[i].created_at,
        ratingsData[i].updated_at,
        ratingsData[i].name
      );
      ratings.push(rating);
    }
    return ratings;
  }
}

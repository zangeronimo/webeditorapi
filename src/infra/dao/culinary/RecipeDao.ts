import { IRecipeDao } from "@application/interface/dao/culinary/IRecipeDao";
import { RecipeWithImagesDto } from "@domain/dto/web/culinary/RecipeWithImagesDto";
import { ActiveEnum } from "@domain/enum";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class RecipeDao implements IRecipeDao {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getWithImageAsync(
    total: number,
    company: string
  ): Promise<RecipeWithImagesDto[]> {
    const orderBy = " r.updated_at desc";
    let where =
      "r.webeditor_companies_id = $1 and r.deleted_at is null and r.active=$2";
    const recipesData: any[] = await this.db.queryAsync(
      `select
        r.id, r.slug, r.name
      from recipes r
      inner join recipe_images ri on ri.recipes_id=r.id and ri.active=$2 and ri.deleted_at is null and ri.webeditor_companies_id = $1
      where ${where}
      group by r.id
      order by ${orderBy}
      limit $3`,
      [company, ActiveEnum.ACTIVE, total]
    );
    const recipes: RecipeWithImagesDto[] = [];
    for (let i = 0; i < recipesData.length; i++) {
      const images = await this.getAllActiveImagesByRecipeId(
        recipesData[i].id,
        company
      );
      const recipeDao = new RecipeWithImagesDto(recipesData[i], images);
      recipes.push(recipeDao);
    }
    return recipes;
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

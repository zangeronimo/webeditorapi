import { ILevelDao } from "@application/interface/dao/culinary/ILevelDao";
import { LevelWithCategoryDto } from "@domain/dto/web/culinary/LevelWithCategory";
import { ActiveEnum } from "@domain/enum";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class LevelDao implements ILevelDao {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getAllAsync(
    withCategories: boolean,
    company: string
  ): Promise<LevelWithCategoryDto[]> {
    const orderBy = " l.name";
    let where =
      "l.webeditor_companies_id = $1 and l.deleted_at is null and l.active=$2";
    const levelData: any[] = await this.db.queryAsync(
      `select
        l.id, l.slug, l.name
      from recipe_levels l
      where ${where}
      order by ${orderBy}`,
      [company, ActiveEnum.ACTIVE]
    );
    const levels: LevelWithCategoryDto[] = [];
    for (let i = 0; i < levelData.length; i++) {
      const categories = withCategories
        ? await this.getAllCategoriesAsync(levelData[i].id, company)
        : [];
      const levelDao = new LevelWithCategoryDto(levelData[i], categories);
      levels.push(levelDao);
    }
    return levels;
  }

  async getAllCategoriesAsync(
    levelId: string,
    company: string
  ): Promise<string[]> {
    const categoryData: any[] = await this.db.queryAsync(
      `select
        id, slug, name
      from recipe_categories
      where webeditor_companies_id = $1 and deleted_at is null and active = $2 and recipe_levels_id = $3
      order by name`,
      [company, ActiveEnum.ACTIVE, levelId]
    );
    const categories: any[] = [];
    for (let i = 0; i < categoryData.length; i++) {
      categories.push({
        id: categoryData[i].id,
        slug: categoryData[i].slug,
        name: categoryData[i].name,
      });
    }
    return categories;
  }
}

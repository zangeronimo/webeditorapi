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

  async getAllAsync(company: string): Promise<LevelWithCategoryDto[]> {
    const orderBy = " l.name";
    let where =
      "l.webeditor_companies_id = $1 and l.deleted_at is null and l.active=$2";
    const levelData: any[] = await this.db.queryAsync(
      `select
        l.id, l.slug, l.name
      from recipe_levels l
      inner join recipe_recipes r on r.recipe_levels_id = l.id
      where ${where}
      order by ${orderBy}`,
      [company, ActiveEnum.ACTIVE]
    );
    const levels: LevelWithCategoryDto[] = [];
    for (let i = 0; i < levelData.length; i++) {
      const levelDao = new LevelWithCategoryDto(levelData[i]);
      levels.push(levelDao);
    }
    return levels;
  }
}

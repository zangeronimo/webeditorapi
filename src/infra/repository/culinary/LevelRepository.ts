import { ILevelRepository } from "@application/interface/repository/culinary";
import { GetAllLevelFilterModel } from "@application/model/culinary/level";
import { Level } from "@domain/entity/culinary";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class LevelRepository implements ILevelRepository {
  constructor(
    @inject('DbContext')
    readonly db: DbContext
  ) {}

  async getByIdAsync(id: string, company: string): Promise<Level | null> {
    const [levelData] = await this.db.queryAsync(
      `select
        id, slug, name, active, webeditor_companies_id
       from recipe_levels
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return levelData
      ? Level.restore(
          levelData.id,
          levelData.slug,
          levelData.name,
          levelData.active,
          levelData.webeditor_companies_id
        )
      : null;
  }

  async getBySlugAsync(slug: string, company: string): Promise<Level | null> {
    const [levelData] = await this.db.queryAsync(
      "select id, slug, name, active, webeditor_companies_id from recipe_levels where slug = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [slug, company]
    );
    return levelData
      ? Level.restore(
          levelData.id,
          levelData.slug,
          levelData.name,
          levelData.active,
          levelData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllLevelFilterModel,
    company: string
  ): Promise<{ itens: Level[]; total: number }> {
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
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from recipe_levels where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.slug?.toLowerCase(),
        model.active,
      ]
    );
    const levelsData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, active, webeditor_companies_id
      from recipe_levels
      where ${where}
      order by ${ordenation}
      limit $5
      offset $6`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.slug?.toLowerCase(),
        model.active,
        model.pageSize,
        offset,
      ]
    );
    const levels: Level[] = [];
    for (let i = 0; i < levelsData.length; i++) {
      const level = Level.restore(
        levelsData[i].id,
        levelsData[i].slug,
        levelsData[i].name,
        levelsData[i].active,
        levelsData[i].webeditor_companies_id
      );
      levels.push(level);
    }
    return { itens: levels, total: total.count };
  }

  async deleteAsync(level: Level, date: Date): Promise<Level> {
    await this.db.queryAsync(
      "update recipe_levels set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [level.id, level.companyId, date]
    );
    return level;
  }

  async updateAsync(level: Level): Promise<Level> {
    await this.db.queryAsync(
      "update recipe_levels set slug=$3, name=$4, active=$5, updated_at=$6 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        level.id,
        level.companyId,
        level.slug,
        level.name,
        level.active,
        level.updatedAt,
      ]
    );
    return level;
  }

  async saveAsync(level: Level): Promise<Level> {
    await this.db.queryAsync(
      "insert into recipe_levels (id, slug, name, active, webeditor_companies_id) values ($1, $2, $3, $4, $5)",
      [level.id, level.slug, level.name, level.active, level.companyId]
    );
    return level;
  }
}

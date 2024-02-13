import { IBannerCategoryRepository } from "@application/interface/repository/publicity";
import { GetAllBannersCategoriesFilterModel } from "@application/model/publicity/bannerCategory";
import { BannerCategory } from "@domain/entity/publicity";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerCategoryRepository implements IBannerCategoryRepository {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getByIdAsync(
    id: string,
    company: string
  ): Promise<BannerCategory | null> {
    const [bannerCategoryData] = await this.db.queryAsync(
      `select
        id, name, active, webeditor_companies_id, created_at, updated_at
       from publicity_banner_category
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return bannerCategoryData
      ? BannerCategory.restore(
          bannerCategoryData.id,
          bannerCategoryData.name,
          bannerCategoryData.active,
          bannerCategoryData.webeditor_companies_id,
          bannerCategoryData.created_at,
          bannerCategoryData.updated_at
        )
      : null;
  }

  async getByNameAsync(
    name: string,
    company: string
  ): Promise<BannerCategory | null> {
    const [bannerCategoryData] = await this.db.queryAsync(
      "select id, name, active, webeditor_companies_id, created_at, updated_at from publicity_banner_category where name = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [name, company]
    );
    return bannerCategoryData
      ? BannerCategory.restore(
          bannerCategoryData.id,
          bannerCategoryData.name,
          bannerCategoryData.active,
          bannerCategoryData.webeditor_companies_id,
          bannerCategoryData.created_at,
          bannerCategoryData.updated_at
        )
      : null;
  }

  async getAllAsync(
    model: GetAllBannersCategoriesFilterModel,
    company: string
  ): Promise<{ itens: BannerCategory[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.active) {
      where += ` and active = $3`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from publicity_banner_category where ${where}`,
      [company, `%${model.name?.toLowerCase().noAccents()}%`, model.active]
    );
    const bannerCategorysData: any[] = await this.db.queryAsync(
      `select
        id, name, active, webeditor_companies_id, created_at, updated_at
      from publicity_banner_category
      where ${where}
      order by ${ordenation}
      limit $4
      offset $5`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.active,
        model.pageSize,
        offset,
      ]
    );
    const bannerCategorys: BannerCategory[] = [];
    for (let i = 0; i < bannerCategorysData.length; i++) {
      const bannerCategory = BannerCategory.restore(
        bannerCategorysData[i].id,
        bannerCategorysData[i].name,
        bannerCategorysData[i].active,
        bannerCategorysData[i].webeditor_companies_id,
        bannerCategorysData[i].created_at,
        bannerCategorysData[i].updated_at
      );
      bannerCategorys.push(bannerCategory);
    }
    return { itens: bannerCategorys, total: total.count };
  }

  async deleteAsync(
    bannerCategory: BannerCategory,
    date: Date
  ): Promise<BannerCategory> {
    await this.db.queryAsync(
      "update publicity_banner_category set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [bannerCategory.id, bannerCategory.companyId, date]
    );
    return bannerCategory;
  }

  async updateAsync(bannerCategory: BannerCategory): Promise<BannerCategory> {
    await this.db.queryAsync(
      "update publicity_banner_category set name=$3, active=$4, updated_at=$5 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        bannerCategory.id,
        bannerCategory.companyId,
        bannerCategory.name,
        bannerCategory.active,
        bannerCategory.updatedAt,
      ]
    );
    return bannerCategory;
  }

  async saveAsync(bannerCategory: BannerCategory): Promise<BannerCategory> {
    await this.db.queryAsync(
      "insert into publicity_banner_category (id, name, active, webeditor_companies_id) values ($1, $2, $3, $4)",
      [
        bannerCategory.id,
        bannerCategory.name,
        bannerCategory.active,
        bannerCategory.companyId,
      ]
    );
    return bannerCategory;
  }
}

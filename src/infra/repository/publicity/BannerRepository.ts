import { IBannerRepository } from "@application/interface/repository/publicity";
import { GetAllBannersFilterModel } from "@application/model/publicity/banner";
import { Banner } from "@domain/entity/publicity";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class BannerRepository implements IBannerRepository {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getByIdAsync(id: string, company: string): Promise<Banner | null> {
    const [bannerData] = await this.db.queryAsync(
      `select
        id, title, url, image, total_views, total_clicks, active, publicity_banner_category_id, webeditor_companies_id, created_at, updated_at
       from publicity_banner
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return bannerData
      ? Banner.restore(
          bannerData.id,
          bannerData.title,
          bannerData.url,
          bannerData.image,
          bannerData.active,
          bannerData.webeditor_companies_id,
          bannerData.publicity_banner_category_id,
          bannerData.created_at,
          bannerData.updated_at,
          bannerData.total_views,
          bannerData.total_clicks
        )
      : null;
  }

  async getByTitleAsync(
    title: string,
    category: string,
    company: string
  ): Promise<Banner | null> {
    const [bannerData] = await this.db.queryAsync(
      "select id, title, url, image, total_views, total_clicks, active, publicity_banner_category_id, webeditor_companies_id, created_at, updated_at from publicity_banner where title = $1 and publicity_banner_category_id = $2 and webeditor_companies_id = $3 and deleted_at is null",
      [title, category, company]
    );
    return bannerData
      ? Banner.restore(
          bannerData.id,
          bannerData.title,
          bannerData.url,
          bannerData.image,
          bannerData.active,
          bannerData.webeditor_companies_id,
          bannerData.publicity_banner_category_id,
          bannerData.created_at,
          bannerData.updated_at,
          bannerData.total_views,
          bannerData.total_clicks
        )
      : null;
  }

  async getAllAsync(
    model: GetAllBannersFilterModel,
    company: string
  ): Promise<{ itens: Banner[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.title) {
      where += ` and LOWER(UNACCENT(title)) like $2`;
    }
    if (!!model.categoryId) {
      where += ` and publicity_banner_category_id = $3`;
    }
    if (!!model.active) {
      where += ` and active = $4`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from publicity_banner where ${where}`,
      [
        company,
        `%${model.title?.toLowerCase().noAccents()}%`,
        model.categoryId,
        model.active,
      ]
    );
    const bannersData: any[] = await this.db.queryAsync(
      `select 
        id, title, url, image, total_views, total_clicks, active, publicity_banner_category_id, webeditor_companies_id, created_at, updated_at
      from publicity_banner
      where ${where}
      order by ${ordenation}
      limit $5
      offset $6`,
      [
        company,
        `%${model.title?.toLowerCase().noAccents()}%`,
        model.categoryId,
        model.active,
        model.pageSize,
        offset,
      ]
    );
    const banners: Banner[] = [];
    for (let i = 0; i < bannersData.length; i++) {
      const banner = Banner.restore(
        bannersData[i].id,
        bannersData[i].title,
        bannersData[i].url,
        bannersData[i].image,
        bannersData[i].active,
        bannersData[i].webeditor_companies_id,
        bannersData[i].publicity_banner_category_id,
        bannersData[i].created_at,
        bannersData[i].updated_at,
        bannersData[i].total_views,
        bannersData[i].total_clicks
      );
      banners.push(banner);
    }
    return { itens: banners, total: total.count };
  }

  async getRandAsync(total: number, company: string): Promise<Banner[]> {
    const where =
      "webeditor_companies_id = $1 and deleted_at is null and active = 1 and image != ''";
    const bannersData: any[] = await this.db.queryAsync(
      `select 
        id, title, url, image, total_views, total_clicks, active, publicity_banner_category_id, webeditor_companies_id, created_at, updated_at
      from publicity_banner
      where ${where}
      order by random()
      limit $2`,
      [company, total]
    );
    const banners: Banner[] = [];
    for (let i = 0; i < bannersData.length; i++) {
      const banner = Banner.restore(
        bannersData[i].id,
        bannersData[i].title,
        bannersData[i].url,
        bannersData[i].image,
        bannersData[i].active,
        bannersData[i].webeditor_companies_id,
        bannersData[i].publicity_banner_category_id,
        bannersData[i].created_at,
        bannersData[i].updated_at,
        bannersData[i].total_views,
        bannersData[i].total_clicks
      );
      banners.push(banner);
    }
    return banners;
  }

  async deleteAsync(banner: Banner, date: Date): Promise<Banner> {
    await this.db.queryAsync(
      "update publicity_banner set deleted_at=$3, updated_at=$3, image=$4 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [banner.id, banner.companyId, date, ""]
    );
    return banner;
  }

  async updateAsync(banner: Banner): Promise<Banner> {
    await this.db.queryAsync(
      "update publicity_banner set title=$3, url=$4, image=$5, total_views=$6, total_clicks=$7, active=$8, publicity_banner_category_id=$9, updated_at=$10 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        banner.id,
        banner.companyId,
        banner.title,
        banner.url,
        banner.image,
        banner.views ?? 0,
        banner.clicks ?? 0,
        banner.active,
        banner.bannerCategory,
        banner.updatedAt,
      ]
    );
    return banner;
  }

  async saveAsync(banner: Banner): Promise<Banner> {
    await this.db.queryAsync(
      "insert into publicity_banner (id, title, url, image, total_views, total_clicks, active, publicity_banner_category_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        banner.id,
        banner.title,
        banner.url,
        banner.image,
        banner.views ?? 0,
        banner.clicks ?? 0,
        banner.active,
        banner.bannerCategory,
        banner.companyId,
        banner.updatedAt,
      ]
    );
    return banner;
  }
}

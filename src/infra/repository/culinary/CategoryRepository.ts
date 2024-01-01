import { ICategoryRepository } from "@application/interface/repository/culinary";
import { GetAllCategoryFilterModel } from "@application/model/culinary/category";
import { Category } from "@domain/entity/culinary";
import { DbContext } from "@infra/context";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @inject("DbContext")
    readonly db: DbContext
  ) {}

  async getByIdAsync(id: string, company: string): Promise<Category | null> {
    const [categoryData] = await this.db.queryAsync(
      `select
        id, slug, name, active, recipe_levels_id, webeditor_companies_id
       from recipe_categories
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return categoryData
      ? Category.restore(
          categoryData.id,
          categoryData.slug,
          categoryData.name,
          categoryData.active,
          categoryData.recipe_levels_id,
          categoryData.webeditor_companies_id
        )
      : null;
  }

  async getBySlugAsync(
    slug: string,
    levelId: string,
    company: string
  ): Promise<Category | null> {
    const [categoryData] = await this.db.queryAsync(
      "select id, slug, name, active, recipe_levels_id, webeditor_companies_id from recipe_categories where slug = $1 and recipe_levels_id = $2 and webeditor_companies_id = $3 and deleted_at is null",
      [slug, levelId, company]
    );
    return categoryData
      ? Category.restore(
          categoryData.id,
          categoryData.slug,
          categoryData.name,
          categoryData.active,
          categoryData.recipe_levels_id,
          categoryData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllCategoryFilterModel,
    company: string
  ): Promise<{ itens: Category[]; total: number }> {
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
      `select count(*) from recipe_categories where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.slug?.toLowerCase(),
        model.active,
        model.levelId,
      ]
    );
    const categoriesData: any[] = await this.db.queryAsync(
      `select
        id, slug, name, active, recipe_levels_id, webeditor_companies_id
      from recipe_categories
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
    const categories: Category[] = [];
    for (let i = 0; i < categoriesData.length; i++) {
      const category = Category.restore(
        categoriesData[i].id,
        categoriesData[i].slug,
        categoriesData[i].name,
        categoriesData[i].active,
        categoriesData[i].recipe_levels_id,
        categoriesData[i].webeditor_companies_id
      );
      categories.push(category);
    }
    return { itens: categories, total: total.count };
  }

  async deleteAsync(category: Category, date: Date): Promise<Category> {
    await this.db.queryAsync(
      "update recipe_categories set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [category.id, category.companyId, date]
    );
    return category;
  }

  async updateAsync(category: Category): Promise<Category> {
    await this.db.queryAsync(
      "update recipe_categories set slug=$3, name=$4, active=$5, recipe_levels_id=$6, updated_at=$7 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        category.id,
        category.companyId,
        category.slug,
        category.name,
        category.active,
        category.levelId,
        category.updatedAt,
      ]
    );
    return category;
  }

  async saveAsync(category: Category): Promise<Category> {
    await this.db.queryAsync(
      "insert into recipe_categories (id, slug, name, active, recipe_levels_id, webeditor_companies_id) values ($1, $2, $3, $4, $5, $6)",
      [
        category.id,
        category.slug,
        category.name,
        category.active,
        category.levelId,
        category.companyId,
      ]
    );
    return category;
  }
}

import { ICategoryRepository } from "@application/interface/repository/culinary";
import { ICategoryUpdate } from "@application/interface/usecase/culinary/category";
import { Messages } from "@application/messages/Messages";
import { CategoryUpdateDataModel } from "@application/model/culinary/category";
import { CategoryDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryUpdate implements ICategoryUpdate {
  constructor(
    @inject("ICategoryRepository")
    readonly _categoryRepository?: ICategoryRepository
  ) {}

  async executeAsync(categoryData: CategoryUpdateDataModel, company: string) {
    const category = await this._categoryRepository?.getByIdAsync(
      categoryData.id,
      company
    )!;
    if (category === null) {
      throw new Error(Messages.notFound("Category"));
    }
    if (categoryData.slug !== category.slug) {
      const existSlug = await this._categoryRepository?.getBySlugAsync(
        categoryData.slug,
        categoryData.levelId,
        company
      );
      if (existSlug !== null) {
        throw new Error(Messages.alreadyInUse("Slug"));
      }
    }
    category.update(categoryData);
    await this._categoryRepository?.updateAsync(category);
    return new CategoryDto(category);
  }
}

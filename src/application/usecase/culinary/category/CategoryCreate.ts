import { ICategoryRepository } from "@application/interface/repository/culinary";
import { ICategoryCreate } from "@application/interface/usecase/culinary/category";
import { Messages } from "@application/messages/Messages";
import { CategoryCreateDataModel } from "@application/model/culinary/category";
import { CategoryDto } from "@domain/dto/culinary";
import { Category } from "@domain/entity/culinary";
import { inject } from "@infra/di/Inject";

export class CategoryCreate implements ICategoryCreate {
  @inject("ICategoryRepository")
  _categoryRepository?: ICategoryRepository;

  async executeAsync(categoryData: CategoryCreateDataModel, company: string) {
    const category = Category.create(categoryData, company);
    if (category === null) {
      throw new Error(Messages.notCreated("Category"));
    }
    const slugExists = await this._categoryRepository?.getBySlugAsync(
      category.slug!,
      company
    );
    if (slugExists !== null) {
      throw new Error(Messages.alreadyInUse("Slug"));
    }
    await this._categoryRepository?.saveAsync(category);
    return new CategoryDto(category);
  }
}

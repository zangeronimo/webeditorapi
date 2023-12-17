import { ICategoryRepository } from "@application/interface/repository/culinary";
import { ICategoryDelete } from "@application/interface/usecase/culinary/category";
import { Messages } from "@application/messages/Messages";
import { CategoryDto } from "@domain/dto/culinary";
import { inject } from "@infra/di/Inject";

export class CategoryDelete implements ICategoryDelete {
  @inject("ICategoryRepository")
  _categoryRepository?: ICategoryRepository;

  async executeAsync(id: string, company: string) {
    const category = await this._categoryRepository?.getByIdAsync(id, company)!;
    if (category === null) {
      throw new Error(Messages.notFound("Category"));
    }
    await this._categoryRepository?.deleteAsync(category, new Date());
    return new CategoryDto(category);
  }
}

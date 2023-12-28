import { ICategoryRepository } from "@application/interface/repository/culinary";
import { ICategoryDelete } from "@application/interface/usecase/culinary/category";
import { Messages } from "@application/messages/Messages";
import { CategoryDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryDelete implements ICategoryDelete {
  constructor(
    @inject("ICategoryRepository")
    readonly _categoryRepository: ICategoryRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const category = await this._categoryRepository.getByIdAsync(id, company)!;
    if (category === null) {
      throw new Error(Messages.notFound("Category"));
    }
    await this._categoryRepository.deleteAsync(category, new Date());
    return new CategoryDto(category);
  }
}

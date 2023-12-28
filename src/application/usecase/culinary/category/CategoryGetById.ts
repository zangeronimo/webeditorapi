import { ICategoryRepository } from "@application/interface/repository/culinary";
import { ICategoryGetById } from "@application/interface/usecase/culinary/category";
import { Messages } from "@application/messages/Messages";
import { CategoryDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryGetById implements ICategoryGetById {
  constructor(
    @inject("ICategoryRepository")
    readonly _categoryRepository?: ICategoryRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const category = await this._categoryRepository?.getByIdAsync(id, company)!;
    if (category === null) {
      throw new Error(Messages.notFound("Category"));
    }
    return new CategoryDto(category);
  }
}

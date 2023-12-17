import { ICategoryRepository } from "@application/interface/repository/culinary";
import { ICategoryGetAll } from "@application/interface/usecase/culinary/category";
import { GetAllCategoryFilterModel } from "@application/model/culinary/category";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { CategoryDto } from "@domain/dto/culinary";
import { Category } from "@domain/entity/culinary";
import { inject } from "@infra/di/Inject";

export class CategoryGetAll implements ICategoryGetAll {
  @inject("ICategoryRepository")
  _categoryRepository?: ICategoryRepository;

  async executeAsync(model: GetAllCategoryFilterModel, company: string) {
    const { itens: categorys, total } =
      await this._categoryRepository?.getAllAsync(model, company)!;
    const categorysDto = categorys.map(
      (category: Category) => new CategoryDto(category)
    );
    return new PaginatorResultDto(categorysDto, total);
  }
}

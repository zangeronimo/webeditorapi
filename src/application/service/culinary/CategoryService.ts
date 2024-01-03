import {
  ICategoryRepository,
  ILevelRepository,
} from "@application/interface/repository/culinary";
import { ICategoryService } from "@application/interface/service/culinary/ICategoryService";
import { CategoryDto, LevelDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject("ICategoryRepository")
    readonly _categoryRepository: ICategoryRepository,
    @inject("ILevelRepository")
    readonly _levelRepository: ILevelRepository
  ) {}

  async getBySlugAsync(
    levelSlug: string,
    categorySlug: string,
    company: string
  ): Promise<CategoryDto> {
    const level = await this._levelRepository.getBySlugAsync(
      levelSlug,
      company
    );
    if (!level) {
      throw new Error("Level not found.");
    }
    const category = await this._categoryRepository.getBySlugAsync(
      categorySlug,
      level.id,
      company
    );
    if (!category) {
      throw new Error("Category not found.");
    }
    return new CategoryDto(category, new LevelDto(level));
  }
}

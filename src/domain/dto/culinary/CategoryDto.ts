import { Category } from "@domain/entity/culinary";
import { DtoBase } from "../DtoBase";
import { LevelDto } from "./LevelDto";

export class CategoryDto extends DtoBase {
  slug: string;
  name: string;
  active: number;
  levelId: string;
  level?: LevelDto;

  constructor(category: Category, level?: LevelDto) {
    super(category.id, category.createdAt, category.updatedAt);
    this.slug = category?.slug!;
    this.name = category?.name;
    this.active = category?.active.valueOf();
    this.levelId = category?.levelId;
    this.level = level;
  }
}

import { Category } from "@domain/entity/culinary";
import { LevelDto } from "./LevelDto";

export class CategoryDto {
  id: string;
  slug: string;
  name: string;
  active: number;
  levelId: string;
  level?: LevelDto;

  constructor(category: Category, level?: LevelDto) {
    this.id = category?.id;
    this.slug = category?.slug!;
    this.name = category?.name;
    this.active = category?.active.valueOf();
    this.levelId = category?.levelId;
    this.level = level;
  }
}

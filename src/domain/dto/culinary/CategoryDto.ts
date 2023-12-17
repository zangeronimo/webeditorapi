import { Category } from "@domain/entity/culinary";

export class CategoryDto {
  id: string;
  slug: string;
  name: string;
  active: number;
  levelId: string;

  constructor(category: Category) {
    this.id = category?.id;
    this.slug = category?.slug!;
    this.name = category?.name;
    this.active = category?.active.valueOf();
    this.levelId = category?.levelId;
  }
}

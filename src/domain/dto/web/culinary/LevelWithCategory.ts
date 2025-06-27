export class LevelWithCategoryDto {
  id: string;
  slug: string;
  name: string;
  categories: any[];

  constructor(level: any, categories: any[]) {
    this.id = level?.id;
    this.slug = level?.slug!;
    this.name = level?.name;
    this.categories = categories;
  }
}

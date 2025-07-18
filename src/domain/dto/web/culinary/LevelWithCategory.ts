export class LevelWithCategoryDto {
  id: string;
  slug: string;
  name: string;

  constructor(level: any) {
    this.id = level?.id;
    this.slug = level?.slug!;
    this.name = level?.name;
  }
}

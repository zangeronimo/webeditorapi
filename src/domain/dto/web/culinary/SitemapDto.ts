export class SitemapDto {
  slug: string;
  updatedAt: string;
  constructor(recipe: any) {
    this.slug = recipe?.slug!;
    this.updatedAt = new Date(recipe?.updated_at).toISOString().split("T")[0];
  }
}

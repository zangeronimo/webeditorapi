export class LevelDto {
  id: string;
  slug: string;
  name: string;
  updatedAt: string;

  constructor(level: any) {
    this.id = level?.id;
    this.slug = level?.slug!;
    this.name = level?.name;
    this.updatedAt = new Date(level?.updated_at).toISOString().split("T")[0];
  }
}

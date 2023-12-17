import { Level } from "@domain/entity/culinary";

export class LevelDto {
  id: string;
  slug: string;
  name: string;
  active: number;

  constructor(level: Level) {
    this.id = level?.id;
    this.slug = level?.slug!;
    this.name = level?.name;
    this.active = level?.active.valueOf();
  }
}

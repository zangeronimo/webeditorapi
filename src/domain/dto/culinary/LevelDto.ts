import { Level } from "@domain/entity/culinary";
import { DtoBase } from "../DtoBase";

export class LevelDto extends DtoBase {
  slug: string;
  name: string;
  active: number;

  constructor(level: Level) {
    super(level.id, level.createdAt, level.updatedAt);
    this.slug = level?.slug!;
    this.name = level?.name;
    this.active = level?.active.valueOf();
  }
}

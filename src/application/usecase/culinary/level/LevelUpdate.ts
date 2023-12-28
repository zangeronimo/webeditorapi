import { ILevelRepository } from "@application/interface/repository/culinary";
import { ILevelUpdate } from "@application/interface/usecase/culinary/level";
import { Messages } from "@application/messages/Messages";
import { LevelUpdateDataModel } from "@application/model/culinary/level";
import { LevelDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class LevelUpdate implements ILevelUpdate {
  constructor(
    @inject("ILevelRepository")
    readonly _levelRepository: ILevelRepository,
  ) {}

  async executeAsync(levelData: LevelUpdateDataModel, company: string) {
    const level = await this._levelRepository.getByIdAsync(
      levelData.id,
      company
    )!;
    if (level === null) {
      throw new Error(Messages.notFound("Level"));
    }
    if (levelData.slug !== level.slug) {
      const existSlug = await this._levelRepository.getBySlugAsync(
        levelData.slug,
        company
      );
      if (existSlug !== null) {
        throw new Error(Messages.alreadyInUse("Slug"));
      }
    }
    level.update(levelData);
    await this._levelRepository.updateAsync(level);
    return new LevelDto(level);
  }
}

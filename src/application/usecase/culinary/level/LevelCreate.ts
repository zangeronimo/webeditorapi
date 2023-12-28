import { ILevelRepository } from "@application/interface/repository/culinary";
import { ILevelCreate } from "@application/interface/usecase/culinary/level";
import { Messages } from "@application/messages/Messages";
import { LevelCreateDataModel } from "@application/model/culinary/level";
import { LevelDto } from "@domain/dto/culinary";
import { Level } from "@domain/entity/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class LevelCreate implements ILevelCreate {
  constructor(
    @inject("ILevelRepository")
    readonly _levelRepository: ILevelRepository,
  ) {}

  async executeAsync(levelData: LevelCreateDataModel, company: string) {
    const level = Level.create(levelData, company);
    if (level === null) {
      throw new Error(Messages.notCreated("Level"));
    }
    const slugExists = await this._levelRepository.getBySlugAsync(
      level.slug!,
      company
    );
    if (slugExists !== null) {
      throw new Error(Messages.alreadyInUse("Slug"));
    }
    await this._levelRepository.saveAsync(level);
    return new LevelDto(level);
  }
}

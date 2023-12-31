import { ILevelRepository } from "@application/interface/repository/culinary";
import { ILevelDelete } from "@application/interface/usecase/culinary/level";
import { Messages } from "@application/messages/Messages";
import { LevelDto } from "@domain/dto/culinary";
import { inject, injectable } from "tsyringe";

@injectable()
export class LevelDelete implements ILevelDelete {
  constructor(
    @inject("ILevelRepository")
    readonly _levelRepository: ILevelRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const level = await this._levelRepository.getByIdAsync(id, company)!;
    if (level === null) {
      throw new Error(Messages.notFound("Level"));
    }
    await this._levelRepository.deleteAsync(level, new Date());
    return new LevelDto(level);
  }
}

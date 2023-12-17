import { ILevelRepository } from "@application/interface/repository/culinary";
import { ILevelGetById } from "@application/interface/usecase/culinary/level";
import { Messages } from "@application/messages/Messages";
import { LevelDto } from "@domain/dto/culinary";
import { inject } from "@infra/di/Inject";

export class LevelGetById implements ILevelGetById {
  @inject("ILevelRepository")
  _levelRepository?: ILevelRepository;

  async executeAsync(id: string, company: string) {
    const level = await this._levelRepository?.getByIdAsync(id, company)!;
    if (level === null) {
      throw new Error(Messages.notFound("Level"));
    }
    return new LevelDto(level);
  }
}

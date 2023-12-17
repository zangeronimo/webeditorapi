import { ILevelRepository } from "@application/interface/repository/culinary";
import { ILevelGetAll } from "@application/interface/usecase/culinary/level";
import { GetAllLevelFilterModel } from "@application/model/culinary/level";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { LevelDto } from "@domain/dto/culinary";
import { Level } from "@domain/entity/culinary";
import { inject } from "@infra/di/Inject";

export class LevelGetAll implements ILevelGetAll {
  @inject("ILevelRepository")
  _levelRepository?: ILevelRepository;

  async executeAsync(model: GetAllLevelFilterModel, company: string) {
    const { itens: levels, total } = await this._levelRepository?.getAllAsync(
      model,
      company
    )!;
    const levelsDto = levels.map((level: Level) => new LevelDto(level));
    return new PaginatorResultDto(levelsDto, total);
  }
}

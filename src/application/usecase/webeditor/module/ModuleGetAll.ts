import { IModuleRepository } from "@application/interface/repository/webeditor";
import { IModuleGetAll } from "@application/interface/usecase/webeditor/module";
import { GetAllModuleFilterModel } from "@application/model/webeditor/module";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ModuleDto } from "@domain/dto/webeditor";
import { Module } from "@domain/entity/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class ModuleGetAll implements IModuleGetAll {
  constructor(
    @inject("IModuleRepository")
    readonly _moduleRepository: IModuleRepository,
  ) {}

  async executeAsync(model: GetAllModuleFilterModel) {
    const { itens: modules, total } = await this._moduleRepository.getAllAsync(
      model
    )!;

    const modulesDto = modules.map((module: Module) => new ModuleDto(module));
    return new PaginatorResultDto(modulesDto, total);
  }
}

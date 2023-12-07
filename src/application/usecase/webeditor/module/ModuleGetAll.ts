import { IModuleRepository } from "@application/interface/repository/webeditor";
import { IModuleGetAll } from "@application/interface/usecase/webeditor/module";
import { GetAllModuleFilterModel } from "@application/model/webeditor/module";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ModuleDto } from "@domain/dto/webeditor";
import { Module } from "@domain/entity/webeditor";
import { inject } from "@infra/di";

export class ModuleGetAll implements IModuleGetAll {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;

  async executeAsync(model: GetAllModuleFilterModel) {
    const { itens: modules, total } = await this._moduleRepository?.getAllAsync(
      model
    )!;

    const modulesDto = modules.map((module: Module) => new ModuleDto(module));
    return new PaginatorResultDto(modulesDto, total);
  }
}

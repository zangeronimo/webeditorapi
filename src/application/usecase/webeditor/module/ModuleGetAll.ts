import { IModuleRepository } from "@application/interface/repository/webeditor";
import { IModuleGetAll } from "@application/interface/usecase/webeditor/module";
import { GetAllModuleFilterModel } from "@application/model/webeditor/module/GetAllModuleFilterModel";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { Module } from "@domain/entity/webeditor/Module";
import { inject } from "@infra/di/Inject";

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

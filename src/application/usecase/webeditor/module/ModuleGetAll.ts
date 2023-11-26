import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { IModuleGetAll } from "@application/interface/usecase/webeditor/module/IModuleGetAll";
import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { GetAllModuleFilterModel } from "@application/model/webeditor/module/GetAllModuleFilterModel";
import { Module } from "@domain/entity/webeditor/Module";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { inject } from "@infra/di/Inject";

export class ModuleGetAll implements IModuleGetAll {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;

  async ExecuteAsync(model: GetAllModuleFilterModel) {
    const { itens: companies, total } = await this._moduleRepository?.getAll(
      model
    )!;

    const companiesDto = companies.map(
      (module: Module) => new ModuleDto(module)
    );
    return new PaginatorResultDto(companiesDto, total);
  }
}

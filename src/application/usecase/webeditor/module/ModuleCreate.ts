import { IModuleRepository } from "@application/interface/repository/webeditor";
import { IModuleCreate } from "@application/interface/usecase/webeditor/module";
import { Messages } from "@application/messages/Messages";
import { ModuleCreateDataModel } from "@application/model/webeditor/module";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { Module } from "@domain/entity/webeditor/Module";
import { inject } from "@infra/di/Inject";

export class ModuleCreate implements IModuleCreate {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;

  async executeAsync(moduleData: ModuleCreateDataModel) {
    const moduleExists = await this._moduleRepository?.getByNameAsync(
      moduleData.name
    );
    if (moduleExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const module = Module.create(moduleData);
    await this._moduleRepository?.saveAsync(module);
    return new ModuleDto(module);
  }
}

import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { IModuleCreate } from "@application/interface/usecase/webeditor/module/IModuleCreate";
import { Messages } from "@application/messages/Messages";
import { ModuleCreateDataModel } from "@application/model/webeditor/module/ModuleCreateModel";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";
import { Module } from "@domain/entity/webeditor/Module";
import { inject } from "@infra/di/Inject";

export class ModuleCreate implements IModuleCreate {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;

  async ExecuteAsync(moduleData: ModuleCreateDataModel) {
    const moduleExists = await this._moduleRepository?.getByName(
      moduleData.name
    );
    if (moduleExists !== null) {
      throw new Error(Messages.AlreadyInUse("Name"));
    }
    const module = await Module.Create(moduleData);
    await this._moduleRepository?.save(module);
    return new ModuleDto(module);
  }
}

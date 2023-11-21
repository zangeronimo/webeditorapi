import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { IModuleUpdate } from "@application/interface/usecase/webeditor/module/IModuleUpdate";
import { Messages } from "@application/messages/Messages";
import { ModuleUpdateDataModel } from "@application/model/webeditor/module/ModuleUpdateModel";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export class ModuleUpdate implements IModuleUpdate {
  constructor(readonly _moduleRepository: IModuleRepository) {}

  async ExecuteAsync(moduleData: ModuleUpdateDataModel) {
    const module = await this._moduleRepository.getById(moduleData.id);
    if (module === null) {
      throw new Error(Messages.NotFound("Module"));
    }
    if (moduleData.name !== module.name) {
      const existName = await this._moduleRepository.getByName(moduleData.name);
      if (existName !== null) {
        throw new Error(Messages.AlreadyInUse("Name"));
      }
    }
    await module.Update(moduleData);
    await this._moduleRepository.update(module);
    return new ModuleDto(module);
  }
}

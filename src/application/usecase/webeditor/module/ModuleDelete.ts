import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { IModuleDelete } from "@application/interface/usecase/webeditor/module/IModuleDelete";
import { Messages } from "@application/messages/Messages";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export class ModuleDelete implements IModuleDelete {
  constructor(readonly _moduleRepository: IModuleRepository) {}

  async ExecuteAsync(id: string) {
    const module = await this._moduleRepository.getById(id);
    if (module === null) {
      throw new Error(Messages.NotFound("Module"));
    }
    await this._moduleRepository.delete(module, new Date());
    return new ModuleDto(module);
  }
}

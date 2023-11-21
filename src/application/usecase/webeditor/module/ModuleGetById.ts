import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { IModuleGetById } from "@application/interface/usecase/webeditor/module/IModuleGetById";
import { Messages } from "@application/messages/Messages";
import { ModuleDto } from "@domain/dto/webeditor/ModuleDto";

export class ModuleGetById implements IModuleGetById {
  constructor(readonly _moduleRepository: IModuleRepository) {}

  async ExecuteAsync(id: string) {
    const module = await this._moduleRepository.getById(id);
    if (module === null) {
      throw new Error(Messages.NotFound("Module"));
    }
    return new ModuleDto(module);
  }
}

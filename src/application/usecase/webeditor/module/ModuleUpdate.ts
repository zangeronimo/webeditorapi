import { IModuleRepository } from "@application/interface/repository/webeditor";
import { IModuleUpdate } from "@application/interface/usecase/webeditor/module";
import { Messages } from "@application/messages/Messages";
import { ModuleUpdateDataModel } from "@application/model/webeditor/module";
import { ModuleDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class ModuleUpdate implements IModuleUpdate {
  constructor(
    @inject("IModuleRepository")
    readonly _moduleRepository: IModuleRepository,
  ) {}

  async executeAsync(moduleData: ModuleUpdateDataModel) {
    const module = await this._moduleRepository.getByIdAsync(moduleData.id)!;
    if (module === null) {
      throw new Error(Messages.notFound("Module"));
    }
    if (moduleData.name !== module.name) {
      const existName = await this._moduleRepository.getByNameAsync(
        moduleData.name
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    module.update(moduleData);
    await this._moduleRepository.updateAsync(module);
    return new ModuleDto(module);
  }
}

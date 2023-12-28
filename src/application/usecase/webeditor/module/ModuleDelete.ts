import { IModuleRepository } from "@application/interface/repository/webeditor";
import { IModuleDelete } from "@application/interface/usecase/webeditor/module";
import { Messages } from "@application/messages/Messages";
import { ModuleDto } from "@domain/dto/webeditor";
import { inject, injectable } from "tsyringe";

@injectable()
export class ModuleDelete implements IModuleDelete {
  constructor(
    @inject("IModuleRepository")
    readonly _moduleRepository: IModuleRepository,
  ) {}

  async executeAsync(id: string) {
    const module = await this._moduleRepository.getByIdAsync(id)!;
    if (module === null) {
      throw new Error(Messages.notFound("Module"));
    }
    await this._moduleRepository.deleteAsync(module, new Date());
    return new ModuleDto(module);
  }
}

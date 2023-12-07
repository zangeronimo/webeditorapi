import { IModuleRepository } from "@application/interface/repository/webeditor";
import { IModuleGetById } from "@application/interface/usecase/webeditor/module";
import { Messages } from "@application/messages/Messages";
import { ModuleDto } from "@domain/dto/webeditor";
import { inject } from "@infra/di/Inject";

export class ModuleGetById implements IModuleGetById {
  @inject("IModuleRepository")
  _moduleRepository?: IModuleRepository;

  async executeAsync(id: string) {
    const module = await this._moduleRepository?.getByIdAsync(id)!;
    if (module === null) {
      throw new Error(Messages.notFound("Module"));
    }
    return new ModuleDto(module);
  }
}

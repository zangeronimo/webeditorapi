import { IClientRepository } from "@application/interface/repository/timesheet";
import { IClientUpdate } from "@application/interface/usecase/timesheet/client";
import { Messages } from "@application/messages/Messages";
import { ClientUpdateDataModel } from "@application/model/timesheet/client";
import { ClientDto } from "@domain/dto/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class ClientUpdate implements IClientUpdate {
  constructor(
    @inject("IClientRepository")
    readonly _clientRepository: IClientRepository,
  ) {}

  async executeAsync(clientData: ClientUpdateDataModel, company: string) {
    const client = await this._clientRepository.getByIdAsync(
      clientData.id,
      company
    )!;
    if (client === null) {
      throw new Error(Messages.notFound("Client"));
    }
    if (clientData.name !== client.name) {
      const existName = await this._clientRepository.getByNameAsync(
        clientData.name,
        company
      );
      if (existName !== null) {
        throw new Error(Messages.alreadyInUse("Name"));
      }
    }
    client.update(clientData);
    await this._clientRepository.updateAsync(client);
    return new ClientDto(client);
  }
}

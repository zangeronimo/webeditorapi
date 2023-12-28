import { IClientRepository } from "@application/interface/repository/timesheet/IClientRepository";
import { IClientCreate } from "@application/interface/usecase/timesheet/client";
import { Messages } from "@application/messages/Messages";
import { ClientCreateDataModel } from "@application/model/timesheet/client";
import { ClientDto } from "@domain/dto/timesheet";
import { Client } from "@domain/entity/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class ClientCreate implements IClientCreate {
  constructor(
    @inject("IClientRepository")
    readonly _clientRepository: IClientRepository,
  ) {}

  async executeAsync(clientData: ClientCreateDataModel, company: string) {
    const nameExists = await this._clientRepository.getByNameAsync(
      clientData.name,
      company
    );
    if (nameExists !== null) {
      throw new Error(Messages.alreadyInUse("Name"));
    }
    const client = Client.create(clientData, company);
    await this._clientRepository.saveAsync(client);
    return new ClientDto(client);
  }
}

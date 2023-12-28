import { IClientRepository } from "@application/interface/repository/timesheet/IClientRepository";
import { IClientDelete } from "@application/interface/usecase/timesheet/client";
import { Messages } from "@application/messages/Messages";
import { ClientDto } from "@domain/dto/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class ClientDelete implements IClientDelete {
  constructor(
    @inject("IClientRepository")
    readonly _clientRepository: IClientRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const client = await this._clientRepository.getByIdAsync(id, company)!;
    if (client === null) {
      throw new Error(Messages.notFound("Client"));
    }
    await this._clientRepository.deleteAsync(client, new Date());
    return new ClientDto(client);
  }
}

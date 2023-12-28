import { IClientRepository } from "@application/interface/repository/timesheet/IClientRepository";
import { IClientGetById } from "@application/interface/usecase/timesheet/client";
import { Messages } from "@application/messages/Messages";
import { ClientDto } from "@domain/dto/timesheet";
import { inject, injectable } from "tsyringe";

@injectable()
export class ClientGetById implements IClientGetById {
  constructor(
    @inject("IClientRepository")
    readonly _clientRepository: IClientRepository,
  ) {}

  async executeAsync(id: string, company: string) {
    const client = await this._clientRepository.getByIdAsync(id, company)!;
    if (client === null) {
      throw new Error(Messages.notFound("Client"));
    }
    return new ClientDto(client);
  }
}

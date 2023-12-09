import { IClientRepository } from "@application/interface/repository/timesheet/IClientRepository";
import { IClientGetAll } from "@application/interface/usecase/timesheet/client";
import { GetAllClientFilterModel } from "@application/model/timesheet/client";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ClientDto } from "@domain/dto/timesheet";
import { Client } from "@domain/entity/timesheet";
import { inject } from "@infra/di/Inject";

export class ClientGetAll implements IClientGetAll {
  @inject("IClientRepository")
  _clientRepository?: IClientRepository;

  async executeAsync(model: GetAllClientFilterModel, company: string) {
    const { itens: clients, total } = await this._clientRepository?.getAllAsync(
      model,
      company
    )!;

    const clientsDto = clients.map((client: Client) => new ClientDto(client));
    return new PaginatorResultDto(clientsDto, total);
  }
}

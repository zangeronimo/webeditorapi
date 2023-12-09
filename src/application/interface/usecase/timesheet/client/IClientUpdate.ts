import { ClientUpdateDataModel } from "@application/model/timesheet/client";
import { ClientDto } from "@domain/dto/timesheet";

export interface IClientUpdate {
  executeAsync(
    clientData: ClientUpdateDataModel,
    company: string
  ): Promise<ClientDto>;
}

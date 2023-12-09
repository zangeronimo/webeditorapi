import { ClientCreateDataModel } from "@application/model/timesheet/client";
import { ClientDto } from "@domain/dto/timesheet";

export interface IClientCreate {
  executeAsync(
    clientData: ClientCreateDataModel,
    company: string
  ): Promise<ClientDto>;
}

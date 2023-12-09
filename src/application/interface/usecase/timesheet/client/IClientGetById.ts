import { ClientDto } from "@domain/dto/timesheet";

export interface IClientGetById {
  executeAsync(id: string, company: string): Promise<ClientDto>;
}

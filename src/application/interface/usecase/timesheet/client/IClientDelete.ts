import { ClientDto } from "@domain/dto/timesheet";

export interface IClientDelete {
  executeAsync(id: string, company: string): Promise<ClientDto>;
}

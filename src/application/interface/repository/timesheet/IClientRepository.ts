import { GetAllClientFilterModel } from "@application/model/timesheet/client";
import { Client } from "@domain/entity/timesheet";

export interface IClientRepository {
  getByIdAsync(id: string, company: string): Promise<Client | null>;
  getByNameAsync(name: string, company: string): Promise<Client | null>;
  getAllAsync(
    model: GetAllClientFilterModel,
    company: string
  ): Promise<{ itens: Client[]; total: number }>;
  updateAsync(client: Client): Promise<Client>;
  saveAsync(client: Client): Promise<Client>;
  deleteAsync(client: Client, date: Date): Promise<Client>;
}

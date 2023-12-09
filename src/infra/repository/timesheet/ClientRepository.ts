import { IClientRepository } from "@application/interface/repository/timesheet";
import { GetAllClientFilterModel } from "@application/model/timesheet/client";
import { Client } from "@domain/entity/timesheet";
import { Role } from "@domain/entity/webeditor";
import { DbContext } from "@infra/context";

export class ClientRepository implements IClientRepository {
  constructor(readonly db: DbContext) {}

  async getByIdAsync(id: string, company: string): Promise<Client | null> {
    const [clientData] = await this.db.queryAsync(
      `select
        id, name, status, webeditor_companies_id
       from timesheet_clients
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    return clientData
      ? Client.restore(
          clientData.id,
          clientData.name,
          clientData.status,
          clientData.webeditor_companies_id
        )
      : null;
  }

  async getByNameAsync(name: string, company: string): Promise<Client | null> {
    const [clientData] = await this.db.queryAsync(
      "select id, name, status, webeditor_companies_id from timesheet_clients where name = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [name, company]
    );
    return clientData
      ? Client.restore(
          clientData.id,
          clientData.name,
          clientData.status,
          clientData.webeditor_companies_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllClientFilterModel,
    company: string
  ): Promise<{ itens: Client[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.status) {
      where += ` and status = $3`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from timesheet_clients where ${where}`,
      [company, `%${model.name?.toLowerCase().noAccents()}%`, model.status]
    );
    const clientsData: any[] = await this.db.queryAsync(
      `select
        id, name, status, webeditor_companies_id
      from timesheet_clients
      where ${where}
      order by ${ordenation}
      limit $4
      offset $5`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.status,
        model.pageSize,
        offset,
      ]
    );
    const clients: Client[] = [];
    for (let i = 0; i < clientsData.length; i++) {
      const client = Client.restore(
        clientsData[i].id,
        clientsData[i].name,
        clientsData[i].status,
        clientsData[i].webeditor_companies_id
      );
      clients.push(client);
    }
    return { itens: clients, total: total.count };
  }

  async deleteAsync(client: Client, date: Date): Promise<Client> {
    await this.db.queryAsync(
      "update timesheet_clients set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [client.id, client.companyId, date]
    );
    return client;
  }

  async updateAsync(client: Client): Promise<Client> {
    await this.db.queryAsync(
      "update timesheet_clients set name=$3, status=$4, updated_at=$5 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        client.id,
        client.companyId,
        client.name,
        client.status,
        client.updatedAt,
      ]
    );
    return client;
  }

  async saveAsync(client: Client): Promise<Client> {
    await this.db.queryAsync(
      "insert into timesheet_clients (id, name, status, webeditor_companies_id) values ($1, $2, $3, $4)",
      [client.id, client.name, client.status, client.companyId]
    );
    return client;
  }
}

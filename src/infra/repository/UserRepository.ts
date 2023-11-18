import { IUserRepository } from "@application/interface/repository/IUserRepository";
import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { User } from "@domain/entity/User";
import { PaginatorResultDto } from "@domain/entity/dto/PaginatorResultDto";
import { DbContext } from "@infra/context/DbContext";

export class UserRepository implements IUserRepository {
  constructor(readonly db: DbContext) {}

  async getById(id: string, company: string): Promise<User | null> {
    const [userData] = await this.db.query(
      `select
        id, name, email, password, webeditor_companies_id
       from webeditor_users
       where id = $1 and webeditor_companies_id = $2`,
      [id, company]
    );
    return userData
      ? User.Restore(
          userData.id,
          userData.name,
          userData.email,
          userData.password,
          userData.webeditor_companies_id
        )
      : null;
  }

  async getByEmail(email: string): Promise<User | null> {
    const [userData] = await this.db.query(
      "select id, name, email, password, webeditor_companies_id from webeditor_users where email = $1",
      [email]
    );
    return userData
      ? User.Restore(
          userData.id,
          userData.name,
          userData.email,
          userData.password,
          userData.webeditor_companies_id
        )
      : null;
  }

  async getAll(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<{ itens: User[]; total: number }> {
    let where = "webeditor_companies_id = $1";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.email) {
      where += ` and LOWER(email) = $3`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * model.page;
    const [total] = await this.db.query(
      `select count(*) from webeditor_users where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.email?.toLowerCase(),
      ]
    );
    const usersData = await this.db.query(
      `select
        id, name, email, password, webeditor_companies_id
      from webeditor_users
      where ${where}
      order by ${ordenation}
      limit $4
      offset $5`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.email?.toLowerCase(),
        model.pageSize,
        offset,
      ]
    );
    const users = usersData.map((userData: any) =>
      User.Restore(
        userData.id,
        userData.name,
        userData.email,
        userData.password,
        userData.webeditor_companies_id
      )
    );
    return { itens: users, total: total.count };
  }
}

import { IUserRepository } from "@application/interface/repository/IUserRepository";
import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { User } from "@domain/entity/User";
import { PaginatorResultDto } from "@domain/entity/dto/PaginatorResultDto";
import { DbContext } from "@infra/context/DbContext";

export class UserRepository implements IUserRepository {
  constructor(readonly db: DbContext) {}

  async getByEmail(email: string): Promise<User> {
    const [userData] = await this.db.query(
      "select id, name, email, password, webeditor_companies_id from webeditor_users where email = $1",
      [email]
    );
    return User.Restore(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.webeditor_companies_id
    );
  }
  async getAll(
    model: GetAllUserFilterModel
  ): Promise<{ itens: User[]; total: number }> {
    const where = "webeditor_companies_id = $1";
    const [total] = await this.db.query(
      `select count(*) from webeditor_users where ${where}`,
      [model.company]
    );
    const usersData = await this.db.query(
      `select
        id, name, email, password, webeditor_companies_id
      from webeditor_users
      where ${where}
      order by id desc
      limit ${model.pageSize}
      offset ${model.pageSize * model.page}`,
      [model.company]
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

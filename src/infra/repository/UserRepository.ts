import { IUserRepository } from "@application/interface/repository/UserRepository";
import { User } from "@domain/entity/User";
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
  async getAll(company: string): Promise<User[]> {
    const usersData = await this.db.query(
      "select id, name, email, password, webeditor_companies_id from webeditor_users where webeditor_companies_id = $1",
      [company]
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
    return users;
  }
}

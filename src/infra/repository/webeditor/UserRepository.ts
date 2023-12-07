import { IUserRepository } from "@application/interface/repository/webeditor";
import { GetAllUserFilterModel } from "@application/model/webeditor/user";
import { Role, User } from "@domain/entity/webeditor";
import { DbContext } from "@infra/context";

export class UserRepository implements IUserRepository {
  constructor(readonly db: DbContext) {}

  async getByIdAsync(id: string, company: string): Promise<User | null> {
    const [userData] = await this.db.queryAsync(
      `select
        id, name, email, password, webeditor_companies_id
       from webeditor_users
       where id = $1 and webeditor_companies_id = $2 and deleted_at is null`,
      [id, company]
    );
    const rolesData = await this.getRolesFromUserAsync(userData?.id);
    return userData
      ? User.restore(
          userData.id,
          userData.name,
          userData.email,
          userData.password,
          userData.webeditor_companies_id,
          rolesData
        )
      : null;
  }

  async getByEmailAsync(email: string): Promise<User | null> {
    const [userData] = await this.db.queryAsync(
      "select id, name, email, password, webeditor_companies_id from webeditor_users where email = $1 and deleted_at is null",
      [email]
    );
    const rolesData = await this.getRolesFromUserAsync(userData?.id);
    return userData
      ? User.restore(
          userData.id,
          userData.name,
          userData.email,
          userData.password,
          userData.webeditor_companies_id,
          rolesData
        )
      : null;
  }

  async getAllAsync(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<{ itens: User[]; total: number }> {
    let where = "webeditor_companies_id = $1 and deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $2`;
    }
    if (!!model.email) {
      where += ` and LOWER(email) = $3`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from webeditor_users where ${where}`,
      [
        company,
        `%${model.name?.toLowerCase().noAccents()}%`,
        model.email?.toLowerCase(),
      ]
    );
    const usersData: any[] = await this.db.queryAsync(
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
    const users: User[] = [];
    for (let i = 0; i < usersData.length; i++) {
      const rolesData = await this.getRolesFromUserAsync(usersData[i].id);
      const user = User.restore(
        usersData[i].id,
        usersData[i].name,
        usersData[i].email,
        usersData[i].password,
        usersData[i].webeditor_companies_id,
        rolesData
      );
      users.push(user);
    }
    return { itens: users, total: total.count };
  }

  private async getRolesFromUserAsync(userId: string): Promise<Role[]> {
    const rolesData = await this.db.queryAsync(
      `select
        r.id,
        r.name,
        r.label,
        r.sort_order,
        r.webeditor_modules_id
      from
        webeditor_users_has_webeditor_roles ur
      inner join webeditor_users u on u.id=ur.webeditor_users_id and u.deleted_at is null
      inner join webeditor_roles r on r.id=ur.webeditor_roles_id and r.deleted_at is null
      where
        ur.webeditor_users_id = $1
      group by r.id
      order by r.sort_order
      `,
      [userId]
    );
    return rolesData.map((role: any) =>
      Role.restore(
        role.id,
        role.name,
        role.label,
        role.sort_order,
        role.webeditor_modules_id
      )
    );
  }

  private async addRolesForUser(userId: string, roles: Role[]) {
    for (let i = 0; i < roles.length; i++) {
      await this.db.queryAsync(
        `insert into webeditor_users_has_webeditor_roles (webeditor_users_id, webeditor_roles_id) values ($1, $2)`,
        [userId, roles[i].id]
      );
    }
  }

  async deleteAsync(user: User, date: Date): Promise<User> {
    await this.db.queryAsync(
      "update webeditor_users set deleted_at=$3, updated_at=$3 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [user.id, user.companyId, date]
    );
    return user;
  }

  async updateAsync(user: User): Promise<User> {
    await this.db.queryAsync(
      `delete from webeditor_users_has_webeditor_roles where webeditor_users_id = $1`,
      [user.id]
    );
    await this.db.queryAsync(
      "update webeditor_users set name=$3, email=$4, password=$5, updated_at=$6 where id = $1 and webeditor_companies_id = $2 and deleted_at is null",
      [
        user.id,
        user.companyId,
        user.name,
        user.email,
        user.password,
        user.updatedAt,
      ]
    );
    await this.addRolesForUser(user.id, user.roles);
    return user;
  }

  async saveAsync(user: User): Promise<User> {
    await this.db.queryAsync(
      "insert into webeditor_users (id, name, email, password, webeditor_companies_id) values ($1, $2, $3, $4, $5)",
      [user.id, user.name, user.email, user.password, user.companyId]
    );
    await this.addRolesForUser(user.id, user.roles);
    return user;
  }
}

import { IRoleRepository } from "@application/interface/repository/webeditor/IRoleRepository";
import { GetAllRoleFilterModel } from "@application/model/webeditor/role/GetAllRoleFilterModel";
import { Role } from "@domain/entity/Role";
import { DbContext } from "@infra/context/DbContext";

export class RoleRepository implements IRoleRepository {
  constructor(readonly db: DbContext) {}

  async getById(id: string): Promise<Role | null> {
    const [roleData] = await this.db.query(
      `select
        id, name, label, sort_order, webeditor_modules_id
       from webeditor_roles
       where id = $1 and deleted_at is null`,
      [id]
    );
    return roleData
      ? Role.Restore(
          roleData.id,
          roleData.name,
          roleData.label,
          roleData.sort_order,
          roleData.webeditor_modules_id
        )
      : null;
  }

  async getByName(name: string): Promise<Role | null> {
    const [roleData] = await this.db.query(
      `select
        id, name, label, sort_order, webeditor_modules_id
       from webeditor_roles
       where name = $1 and deleted_at is null`,
      [name]
    );
    return roleData
      ? Role.Restore(
          roleData.id,
          roleData.name,
          roleData.label,
          +roleData.sort_order,
          roleData.webeditor_modules_id
        )
      : null;
  }

  async getAll(
    model: GetAllRoleFilterModel
  ): Promise<{ itens: Role[]; total: number }> {
    let where = "deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(name) = $1`;
    }
    if (!!model.label) {
      where += ` and LOWER(UNACCENT(label)) like $2`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * model.page;
    const [total] = await this.db.query(
      `select count(*) from webeditor_roles where ${where}`,
      [model.name?.toLowerCase(), `%${model.label?.toLowerCase().noAccents()}%`]
    );
    const rolesData: any[] = await this.db.query(
      `select
        id, name, label, sort_order, webeditor_modules_id
      from webeditor_roles
      where ${where}
      order by ${ordenation}
      limit $3
      offset $4`,
      [
        model.name?.toLowerCase(),
        `%${model.label?.toLowerCase().noAccents()}%`,
        model.pageSize,
        offset,
      ]
    );
    const roles: Role[] = [];
    for (let i = 0; i < rolesData.length; i++) {
      const role = Role.Restore(
        rolesData[i].id,
        rolesData[i].name,
        rolesData[i].label,
        +rolesData[i].sort_order,
        rolesData[i].webeditor_modules_id
      );
      roles.push(role);
    }
    return { itens: roles, total: total.count };
  }

  async delete(role: Role, date: Date): Promise<Role> {
    await this.db.query(
      "update webeditor_roles set deleted_at=$2, updated_at=$2 where id = $1 and deleted_at is null",
      [role.id, date]
    );
    return role;
  }

  async update(role: Role): Promise<Role> {
    console.log(role);
    await this.db.query(
      "update webeditor_roles set name=$2, label=$3, sort_order=$4, webeditor_modules_id=$5, updated_at=$6 where id = $1 and deleted_at is null",
      [
        role.id,
        role.name,
        role.label,
        role.order,
        role.moduleId,
        role.updatedAt,
      ]
    );
    return role;
  }

  async save(role: Role): Promise<Role> {
    await this.db.query(
      "insert into webeditor_roles (id, name, label, sort_order, webeditor_modules_id) values ($1, $2, $3, $4, $5)",
      [role.id, role.name, role.label, role.order, role.moduleId]
    );
    return role;
  }
}

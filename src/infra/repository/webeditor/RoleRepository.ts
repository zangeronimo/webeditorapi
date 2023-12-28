import { IRoleRepository } from "@application/interface/repository/webeditor";
import { GetAllRoleFilterModel } from "@application/model/webeditor/role";
import { Role } from "@domain/entity/webeditor";
import { DbContext } from "@infra/context";
import {  inject, injectable } from "tsyringe";

@injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @inject('DbContext')
    readonly db: DbContext
  ) {}

  async getAllByModuleAsync(moduleId: string): Promise<Role[]> {
    const rolesData = await this.db.queryAsync(
      `select
        id, name, label, sort_order, webeditor_modules_id
      from webeditor_roles
      where webeditor_modules_id = $1 and deleted_at is null
      order by name desc, sort_order`,
      [moduleId]
    );
    const roles: Role[] = [];
    for (let i = 0; i < rolesData.length; i++) {
      const role = Role.restore(
        rolesData[i].id,
        rolesData[i].name,
        rolesData[i].label,
        +rolesData[i].sort_order,
        rolesData[i].webeditor_modules_id
      );
      roles.push(role);
    }
    return roles;
  }

  async getByIdAsync(id: string): Promise<Role | null> {
    const [roleData] = await this.db.queryAsync(
      `select
        id, name, label, sort_order, webeditor_modules_id
       from webeditor_roles
       where id = $1 and deleted_at is null`,
      [id]
    );
    return roleData
      ? Role.restore(
          roleData.id,
          roleData.name,
          roleData.label,
          roleData.sort_order,
          roleData.webeditor_modules_id
        )
      : null;
  }

  async getByNameAsync(name: string): Promise<Role | null> {
    const [roleData] = await this.db.queryAsync(
      `select
        id, name, label, sort_order, webeditor_modules_id
       from webeditor_roles
       where name = $1 and deleted_at is null`,
      [name]
    );
    return roleData
      ? Role.restore(
          roleData.id,
          roleData.name,
          roleData.label,
          +roleData.sort_order,
          roleData.webeditor_modules_id
        )
      : null;
  }

  async getAllAsync(
    model: GetAllRoleFilterModel
  ): Promise<{ itens: Role[]; total: number }> {
    let where = "deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(name) = $1`;
    }
    if (!!model.label) {
      where += ` and LOWER(UNACCENT(label)) like $2`;
    }
    if (!!model.moduleId) {
      where += ` and webeditor_modules_id = $3`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.queryAsync(
      `select count(*) from webeditor_roles where ${where}`,
      [
        model.name?.toLowerCase(),
        `%${model.label?.toLowerCase().noAccents()}%`,
        model.moduleId,
      ]
    );
    const rolesData: any[] = await this.db.queryAsync(
      `select
        id, name, label, sort_order, webeditor_modules_id
      from webeditor_roles
      where ${where}
      order by ${ordenation}
      limit $4
      offset $5`,
      [
        model.name?.toLowerCase(),
        `%${model.label?.toLowerCase().noAccents()}%`,
        model.moduleId,
        model.pageSize,
        offset,
      ]
    );
    const roles: Role[] = [];
    for (let i = 0; i < rolesData.length; i++) {
      const role = Role.restore(
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

  async deleteAsync(role: Role, date: Date): Promise<Role> {
    await this.db.queryAsync(
      "update webeditor_roles set deleted_at=$2, updated_at=$2 where id = $1 and deleted_at is null",
      [role.id, date]
    );
    return role;
  }

  async updateAsync(role: Role): Promise<Role> {
    await this.db.queryAsync(
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

  async saveAsync(role: Role): Promise<Role> {
    await this.db.queryAsync(
      "insert into webeditor_roles (id, name, label, sort_order, webeditor_modules_id) values ($1, $2, $3, $4, $5)",
      [role.id, role.name, role.label, role.order, role.moduleId]
    );
    return role;
  }
}

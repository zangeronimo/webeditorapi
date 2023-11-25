import { IModuleRepository } from "@application/interface/repository/webeditor/IModuleRepository";
import { GetAllModuleFilterModel } from "@application/model/webeditor/module/GetAllModuleFilterModel";
import { Module } from "@domain/entity/webeditor/Module";
import { DbContext } from "@infra/context/DbContext";

export class ModuleRepository implements IModuleRepository {
  constructor(readonly db: DbContext) {}

  async getById(id: string): Promise<Module | null> {
    const [moduleData] = await this.db.query(
      `select
        id, name
       from webeditor_modules
       where id = $1 and deleted_at is null`,
      [id]
    );
    return moduleData ? Module.Restore(moduleData.id, moduleData.name) : null;
  }

  async getByName(name: string): Promise<Module | null> {
    const [moduleData] = await this.db.query(
      `select
        id, name
       from webeditor_modules
       where name = $1 and deleted_at is null`,
      [name]
    );
    return moduleData ? Module.Restore(moduleData.id, moduleData.name) : null;
  }

  async getAll(
    model: GetAllModuleFilterModel
  ): Promise<{ itens: Module[]; total: number }> {
    let where = "deleted_at is null";
    if (!!model.name) {
      where += ` and LOWER(UNACCENT(name)) like $1`;
    }
    const ordenation = `${model.orderBy} ${!!model.desc ? "desc" : "asc"}`;
    const offset = model.pageSize * (model.page - 1);
    const [total] = await this.db.query(
      `select count(*) from webeditor_modules where ${where}`,
      [`%${model.name?.toLowerCase().noAccents()}%`]
    );
    const modulesData: any[] = await this.db.query(
      `select
        id, name
      from webeditor_modules
      where ${where}
      order by ${ordenation}
      limit $2
      offset $3`,
      [`%${model.name?.toLowerCase().noAccents()}%`, model.pageSize, offset]
    );
    const modules: Module[] = [];
    for (let i = 0; i < modulesData.length; i++) {
      const module = Module.Restore(modulesData[i].id, modulesData[i].name);
      modules.push(module);
    }
    return { itens: modules, total: total.count };
  }

  async delete(module: Module, date: Date): Promise<Module> {
    await this.db.query(
      "update webeditor_modules set deleted_at=$2, updated_at=$2 where id = $1 and deleted_at is null",
      [module.id, date]
    );
    return module;
  }

  async update(module: Module): Promise<Module> {
    await this.db.query(
      "update webeditor_modules set name=$2, updated_at=$3 where id = $1 and deleted_at is null",
      [module.id, module.name, module.updatedAt]
    );
    return module;
  }

  async save(module: Module): Promise<Module> {
    await this.db.query(
      "insert into webeditor_modules (id, name) values ($1, $2)",
      [module.id, module.name]
    );
    return module;
  }
}

import { GetAllRoleFilterModel } from "@application/model/webeditor/role/GetAllRoleFilterModel";
import { Role } from "@domain/entity/webeditor/Role";

export interface IRoleRepository {
  getAllByModule(moduleId: string): Promise<Role[]>;
  getById(id: string): Promise<Role | null>;
  getByName(name: string): Promise<Role | null>;
  getAll(
    model: GetAllRoleFilterModel
  ): Promise<{ itens: Role[]; total: number }>;
  update(user: Role): Promise<Role>;
  save(user: Role): Promise<Role>;
  delete(user: Role, date: Date): Promise<Role>;
}

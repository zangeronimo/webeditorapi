import { GetAllRoleFilterModel } from "@application/model/webeditor/role/GetAllRoleFilterModel";
import { Role } from "@domain/entity/webeditor/Role";

export interface IRoleRepository {
  getAllByModuleAsync(moduleId: string): Promise<Role[]>;
  getByIdAsync(id: string): Promise<Role | null>;
  getByNameAsync(name: string): Promise<Role | null>;
  getAllAsync(
    model: GetAllRoleFilterModel
  ): Promise<{ itens: Role[]; total: number }>;
  updateAsync(user: Role): Promise<Role>;
  saveAsync(user: Role): Promise<Role>;
  deleteAsync(user: Role, date: Date): Promise<Role>;
}

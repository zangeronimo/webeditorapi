import { RoleDto } from "@domain/dto/webeditor";

export interface IRoleDelete {
  executeAsync(id: string): Promise<RoleDto>;
}

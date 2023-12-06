import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export interface IRoleDelete {
  executeAsync(id: string): Promise<RoleDto>;
}

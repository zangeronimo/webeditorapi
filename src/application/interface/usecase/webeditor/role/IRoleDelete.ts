import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export interface IRoleDelete {
  ExecuteAsync(id: string): Promise<RoleDto>;
}

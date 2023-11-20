import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export interface IRoleGetById {
  ExecuteAsync(id: string): Promise<RoleDto>;
}

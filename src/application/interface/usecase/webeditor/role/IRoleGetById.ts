import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export interface IRoleGetById {
  executeAsync(id: string): Promise<RoleDto>;
}

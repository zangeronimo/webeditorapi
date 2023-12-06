import { RoleDto } from "@domain/dto/webeditor";

export interface IRoleGetById {
  executeAsync(id: string): Promise<RoleDto>;
}

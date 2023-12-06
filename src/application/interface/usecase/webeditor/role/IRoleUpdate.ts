import { RoleUpdateDataModel } from "@application/model/webeditor/role";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export interface IRoleUpdate {
  executeAsync(roleData: RoleUpdateDataModel): Promise<RoleDto>;
}

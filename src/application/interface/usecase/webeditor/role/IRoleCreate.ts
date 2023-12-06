import { RoleCreateDataModel } from "@application/model/webeditor/role";
import { RoleDto } from "@domain/dto/webeditor";

export interface IRoleCreate {
  executeAsync(roleData: RoleCreateDataModel): Promise<RoleDto>;
}

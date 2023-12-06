import { RoleCreateDataModel } from "@application/model/webeditor/role/RoleCreateModel";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export interface IRoleCreate {
  executeAsync(roleData: RoleCreateDataModel): Promise<RoleDto>;
}

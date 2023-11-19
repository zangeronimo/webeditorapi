import { RoleUpdateDataModel } from "@application/model/webeditor/role/RoleUpdateModel";
import { RoleDto } from "@domain/dto/webeditor/RoleDto";

export interface IRoleUpdate {
  ExecuteAsync(roleData: RoleUpdateDataModel): Promise<RoleDto>;
}

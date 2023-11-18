import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { User } from "@domain/entity/User";
import { PaginatorResultDto } from "@domain/entity/dto/PaginatorResultDto";

export interface IUserRepository {
  getByEmail(email: string): Promise<User>;
  getAll(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<{ itens: User[]; total: number }>;
}

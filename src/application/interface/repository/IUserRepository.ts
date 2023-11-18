import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { User } from "@domain/entity/User";
import { PaginatorResultDto } from "@domain/entity/dto/PaginatorResultDto";

export interface IUserRepository {
  getById(id: string, company: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getAll(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<{ itens: User[]; total: number }>;
  delete(user: User, date: Date): Promise<User>;
}

import { GetAllUserFilterModel } from "@application/model/GetAllUserFilterModel";
import { User } from "@domain/entity/User";

export interface IUserRepository {
  getById(id: string, company: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getAll(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<{ itens: User[]; total: number }>;
  update(user: User): Promise<User>;
  delete(user: User, date: Date): Promise<User>;
}

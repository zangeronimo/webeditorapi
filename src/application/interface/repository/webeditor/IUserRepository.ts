import { GetAllUserFilterModel } from "@application/model/webeditor/user/GetAllUserFilterModel";
import { User } from "@domain/entity/webeditor/User";

export interface IUserRepository {
  getByIdAsync(id: string, company: string): Promise<User | null>;
  getByEmailAsync(email: string): Promise<User | null>;
  getAllAsync(
    model: GetAllUserFilterModel,
    company: string
  ): Promise<{ itens: User[]; total: number }>;
  updateAsync(user: User): Promise<User>;
  saveAsync(user: User): Promise<User>;
  deleteAsync(user: User, date: Date): Promise<User>;
}

import { User } from "@domain/entity/User";

export interface IUserRepository {
  getByEmail(email: string): Promise<User>;
  getAll(): Promise<User[]>;
}

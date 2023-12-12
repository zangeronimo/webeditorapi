import { IHashProvider } from "@application/interface/provider";
import {
  UserCreateDataModel,
  UserUpdateDataModel,
} from "@application/model/webeditor/user";
import { inject } from "@infra/di/Inject";
import { Role } from "./Role";
import { Password } from "@domain/valueObject/Password";
import { BPKDF2Provider } from "@infra/provider";

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: Password;
  private _updatedAt?: Date;
  private _roles: Role[];

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get roles() {
    return this._roles;
  }

  private constructor(
    id: string,
    name: string,
    email: string,
    password: Password,
    roles: Role[],
    readonly companyId: string
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._roles = roles;
  }

  static restore(
    id: string,
    name: string,
    email: string,
    password: string,
    salt: string,
    companyId: string,
    roles: Role[]
  ): User {
    return new User(
      id,
      name,
      email,
      Password.restore(password, salt),
      roles,
      companyId
    );
  }

  static async createAsync(
    userData: UserCreateDataModel,
    companyId: string
  ): Promise<User> {
    const user = new User(
      crypto.randomUUID(),
      userData.name,
      userData.email,
      Password.create(userData.password),
      userData.roles,
      companyId
    );
    return user;
  }

  async updateAsync(userData: UserUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = userData.name;
    this._email = userData.email;
    this._roles = userData.roles;
    if (!!userData.password) {
      this._password = Password.create(userData.password);
    }
  }
}

import {
  UserCreateDataModel,
  UserUpdateDataModel,
} from "@application/model/webeditor/user";
import { Role } from "./Role";
import { Password } from "@domain/valueObject/Password";
import { EntityBase } from "../EntityBase";

export class User extends EntityBase {
  private _name: string;
  private _email: string;
  private _password: Password;
  private _roles: Role[];

  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }
  get roles() {
    return this._roles;
  }

  private constructor(
    name: string,
    email: string,
    password: Password,
    roles: Role[],
    companyId: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
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
    roles: Role[],
    createdAt: Date,
    updatedAt: Date
  ): User {
    return new User(
      name,
      email,
      Password.restore(password, salt),
      roles,
      companyId,
      id,
      createdAt,
      updatedAt
    );
  }

  static async createAsync(
    userData: UserCreateDataModel,
    companyId: string
  ): Promise<User> {
    const user = new User(
      userData.name,
      userData.email,
      Password.create(userData.password),
      userData.roles,
      companyId
    );
    return user;
  }

  async updateAsync(userData: UserUpdateDataModel) {
    this.updateBase();
    this._name = userData.name;
    this._email = userData.email;
    this._roles = userData.roles;
    if (!!userData.password) {
      this._password = Password.create(userData.password);
    }
  }
}

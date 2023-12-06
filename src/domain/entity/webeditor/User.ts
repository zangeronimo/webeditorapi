import { IHashProvider } from "@application/interface/provider/IHashProvider";
import { UserCreateDataModel } from "@application/model/webeditor/user/UserCreateModel";
import { UserUpdateDataModel } from "@application/model/webeditor/user/UserUpdateModel";
import { inject } from "@infra/di/Inject";
import { Role } from "./Role";

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _updatedAt?: Date;
  private _roles: Role[];

  @inject("IHashProvider")
  _hashProvider?: IHashProvider;

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
    password: string = "",
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
    companyId: string,
    roles: Role[]
  ): User {
    return new User(id, name, email, password, roles, companyId);
  }

  static async create(
    userData: UserCreateDataModel,
    companyId: string
  ): Promise<User> {
    const user = new User(
      crypto.randomUUID(),
      userData.name,
      userData.email,
      userData.password,
      userData.roles,
      companyId
    );
    await user.setPassword(userData.password);
    return user;
  }

  private async setPassword(password: string) {
    this._password = await this._hashProvider?.generateHashAsync(password)!;
  }

  async checkPasswordAsync(password: string): Promise<boolean> {
    return await this._hashProvider?.compareHashAsync(
      password,
      this._password
    )!;
  }

  async updateAsync(userData: UserUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = userData.name;
    this._email = userData.email;
    this._roles = userData.roles;
    if (!!userData.password) {
      await this.setPassword(userData.password);
    }
  }
}

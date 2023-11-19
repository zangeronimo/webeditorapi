import { IHashProvider } from "@application/interface/provider/IHashProvider";
import { UserUpdateDataModel } from "@application/model/UserUpdateModel";
import { inject } from "@infra/di/Inject";
import { Role } from "./Role";
import { UserCreateDataModel } from "@application/model/UserCreateModel";

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _updatedAt?: Date;
  private _roles: Role[];

  @inject("IHashProvider")
  _hashProvider?: IHashProvider;

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }
  public get email() {
    return this._email;
  }
  public get password() {
    return this._password;
  }
  public get updatedAt() {
    return this._updatedAt;
  }
  public get roles() {
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

  public static Restore(
    id: string,
    name: string,
    email: string,
    password: string,
    companyId: string,
    roles: Role[]
  ): User {
    return new User(id, name, email, password, roles, companyId);
  }

  public static async Create(
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
    await user.SetPassword(userData.password);
    return user;
  }

  private async SetPassword(password: string) {
    this._password = await this._hashProvider?.generateHash(password)!;
  }

  public async CheckPassword(password: string): Promise<boolean> {
    return await this._hashProvider?.compareHash(password, this._password)!;
  }

  async Update(userData: UserUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = userData.name;
    this._email = userData.email;
    this._roles = userData.roles;
    if (!!userData.password) {
      await this.SetPassword(userData.password);
    }
  }
}

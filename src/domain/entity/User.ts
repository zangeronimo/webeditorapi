import { IHashProvider } from "@application/interface/provider/IHashProvider";
import { UserUpdateDataModel } from "@application/model/UserUpdateModel";
import { inject } from "@infra/di/Inject";

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _updatedAt?: Date;

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

  private constructor(
    id: string,
    name: string,
    email: string,
    password: string = "",
    readonly companyId: string
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
  }

  public static Restore(
    id: string,
    name: string,
    email: string,
    password: string,
    companyId: string
  ): User {
    return new User(id, name, email, password, companyId);
  }

  public static async Create(
    name: string,
    email: string,
    password: string,
    companyId: string
  ): Promise<User> {
    const user = new User(crypto.randomUUID(), name, email, "", companyId);
    await user.SetPassword(password);
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
    if (!!userData.password) {
      await this.SetPassword(userData.password);
    }
  }
}

import { IHashProvider } from "@application/interface/provider/IHashProvider";
import { inject } from "@infra/di/Inject";

export class User {
  private password: string;

  @inject("IHashProvider")
  _hashProvider?: IHashProvider;

  private constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    password: string = "",
    readonly companyId: string
  ) {
    this.password = password;
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
    this.password = await this._hashProvider?.generateHash(password)!;
  }

  public async CheckPassword(password: string): Promise<boolean> {
    return await this._hashProvider?.compareHash(password, this.password)!;
  }
}

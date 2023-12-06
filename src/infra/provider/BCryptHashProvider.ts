import { IHashProvider } from "@application/interface/provider/IHashProvider";
import { compare, hash } from "bcryptjs";

export class BCryptHashProvider implements IHashProvider {
  public async generateHashAsync(payload: string): Promise<string> {
    return await hash(payload, 8);
  }

  public async compareHashAsync(
    payload: string,
    hashed: string
  ): Promise<boolean> {
    return await compare(payload, hashed);
  }
}

import { IHashProvider } from "@application/interface/provider";
import { Messages } from "@application/messages/Messages";
import { inject } from "@infra/di/Inject";
import { BPKDF2Provider } from "@infra/provider";

export class Password {
  @inject("IHashProvider")
  _hashProvider?: IHashProvider;
  private constructor(readonly value: string, readonly salt: string) {}
  static create(password: string) {
    const _hashProvider = new BPKDF2Provider();
    const { hash, salt } = _hashProvider?.generateHash(password)!;
    if (!hash || !salt) {
      throw new Error(Messages.passwordHashFail);
    }
    return new Password(hash, salt);
  }
  static restore(hash: string, salt: string) {
    return new Password(hash, salt);
  }
  validate(password: string) {
    return this._hashProvider?.compareHash(password, this.salt, this.value);
  }
}

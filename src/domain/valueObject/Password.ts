import { Messages } from "@application/messages/Messages";
import { BPKDF2Provider } from "@infra/provider";
import { container } from "tsyringe";

export class Password {
    readonly _hashProvider = container.resolve(BPKDF2Provider)

  private constructor(readonly value: string, readonly salt: string) {}
  static create(password: string) {
    const _hashProvider= new BPKDF2Provider();
    const { hash, salt } = _hashProvider.generateHash(password)!;
    if (!hash || !salt) {
      throw new Error(Messages.passwordHashFail);
    }
    return new Password(hash, salt);
  }
  static restore(hash: string, salt: string) {
    return new Password(hash, salt);
  }
  validate(password: string) {
    return this._hashProvider.compareHash(password, this.salt, this.value);
  }
}

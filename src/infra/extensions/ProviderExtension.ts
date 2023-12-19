import {
  HasRole,
  MakeLogin,
  RefreshToken,
} from "@application/usecase/webeditor";
import { BPKDF2Provider, JwtWebTokenProvider } from "@infra/provider";
import { DiskStorageProvider } from "@infra/provider/DiskStorageProvider";
import { Registry } from "../di/Registry";

export class ProviderExtesion {
  static init() {
    Registry.getInstance().provide("IMakeLogin", new MakeLogin());
    Registry.getInstance().provide("IRefreshToken", new RefreshToken());
    Registry.getInstance().provide("IHasRole", new HasRole());
    Registry.getInstance().provide("IHashProvider", new BPKDF2Provider());
    Registry.getInstance().provide("ITokenProvider", new JwtWebTokenProvider());
    Registry.getInstance().provide(
      "IStorageProvider",
      new DiskStorageProvider()
    );
  }
}

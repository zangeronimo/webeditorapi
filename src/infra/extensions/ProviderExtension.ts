import {
  MakeLogin,
  RefreshToken,
  HasRole,
} from "@application/usecase/webeditor";
import { BCryptHashProvider, JwtWebTokenProvider } from "@infra/provider";
import { Registry } from "../di/Registry";

export class ProviderExtesion {
  static init() {
    Registry.getInstance().provide("IMakeLogin", new MakeLogin());
    Registry.getInstance().provide("IRefreshToken", new RefreshToken());
    Registry.getInstance().provide("IHasRole", new HasRole());
    Registry.getInstance().provide("IHashProvider", new BCryptHashProvider());
    Registry.getInstance().provide("ITokenProvider", new JwtWebTokenProvider());
  }
}

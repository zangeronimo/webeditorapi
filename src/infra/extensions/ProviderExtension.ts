import {
  EnsureAuthenticated,
  EnsureHasRole,
  IEnsureAuthenticated,
  IEnsureHasRole,
} from "@api/midleware";
import { IHashProvider, ITokenProvider } from "@application/interface/provider";
import { IStorageProvider } from "@application/interface/provider/IStorageProvider";
import {
  IHasRole,
  IMakeLogin,
  IRefreshToken,
} from "@application/interface/usecase/webeditor";
import {
  HasRole,
  MakeLogin,
  RefreshToken,
} from "@application/usecase/webeditor";
import { DbContext, PgPromiseContext } from "@infra/context";
import { BPKDF2Provider, JwtWebTokenProvider } from "@infra/provider";
import { DiskStorageProvider } from "@infra/provider/DiskStorageProvider";
import { container } from "tsyringe";

export class ProviderExtesion {
  static init() {
    container.registerSingleton<DbContext>("DbContext", PgPromiseContext);
    container.registerSingleton<IEnsureAuthenticated>(
      "IEnsureAuthenticated",
      EnsureAuthenticated
    );
    container.registerSingleton<IEnsureHasRole>(
      "IEnsureHasRole",
      EnsureHasRole
    );
    container.registerSingleton<IMakeLogin>("IMakeLogin", MakeLogin);
    container.registerSingleton<IRefreshToken>("IRefreshToken", RefreshToken);
    container.registerSingleton<IHasRole>("IHasRole", HasRole);
    container.registerSingleton<IHashProvider>("IHashProvider", BPKDF2Provider);
    container.registerSingleton<ITokenProvider>(
      "ITokenProvider",
      JwtWebTokenProvider
    );
    container.registerSingleton<IStorageProvider>(
      "IStorageProvider",
      DiskStorageProvider
    );
  }
}

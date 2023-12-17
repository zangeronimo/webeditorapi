import { DbContext } from "@infra/context";
import { CulinaryExtension } from "./CulinaryExtension";
import { ProviderExtesion } from "./ProviderExtension";
import { TimeSheetExtension } from "./TimeSheetExtension";
import { WEBEditorExtension } from "./WEBEditorExtension";

export class ExtensionDI {
  static init = (dbContext: DbContext) => {
    ProviderExtesion.init();

    WEBEditorExtension.init(dbContext);
    TimeSheetExtension.init(dbContext);
    CulinaryExtension.init(dbContext);
  };
}

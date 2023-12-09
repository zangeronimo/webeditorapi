import { DbContext } from "@infra/context";
import { ProviderExtesion } from "./ProviderExtension";
import { WEBEditorExtension } from "./WEBEditorExtension";
import { TimeSheetExtension } from "./TimeSheetExtension";

export class ExtensionDI {
  static init = (dbContext: DbContext) => {
    ProviderExtesion.init();

    WEBEditorExtension.init(dbContext);
    TimeSheetExtension.init(dbContext);
  };
}

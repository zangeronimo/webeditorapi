import { CulinaryExtension } from "./CulinaryExtension";
import { InstitutionalExtension } from "./InstitutionalExtension";
import { ProviderExtesion } from "./ProviderExtension";
import { TimeSheetExtension } from "./TimeSheetExtension";
import { WEBEditorExtension } from "./WEBEditorExtension";

export class ExtensionDI {
  static init = () => {
    ProviderExtesion.init();
    WEBEditorExtension.init();
    TimeSheetExtension.init();
    CulinaryExtension.init();
    InstitutionalExtension.init();
  };
}

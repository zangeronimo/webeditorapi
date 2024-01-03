import { DateExtensions } from "./date";
import { StringExtensions } from "./string";

export class Extensions {
  static init = () => {
    StringExtensions.noAccents;
    DateExtensions.toString;
  };
}

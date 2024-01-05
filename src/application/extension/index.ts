import { DateExtensions } from "./date";
import { NumberExtensions } from "./number";
import { StringExtensions } from "./string";

export class Extensions {
  static init = () => {
    StringExtensions.noAccents;
    DateExtensions.toString;
    NumberExtensions.toStarts;
  };
}

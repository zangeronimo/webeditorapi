export class DateExtensions {
  static toFormat = Object.defineProperty(Date.prototype, "toFormat", {
    value: function toString(pattern: string) {
      if (pattern) {
        const date = new Date(this);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (1 + date.getMonth()).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const result = pattern
          .replace("dd", day)
          .replace("MM", month)
          .replace("yyyy", year)
          .replace("hh", hours)
          .replace("mm", minutes)
          .replace("ss", seconds);
        return result;
      }
    },
    writable: true,
    configurable: true,
  });
}

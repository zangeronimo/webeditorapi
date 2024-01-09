const STAR_FULL = "★";
const STAR_HALF = "✮";
const STAR_EMPTY = "✰";
export class NumberExtensions {
  static toStars = Object.defineProperty(Number.prototype, "toStars", {
    value: function toStars() {
      return numberToStar(this / 2);
    },
    writable: true,
    configurable: true,
  });
}

const numberToStar = (rate: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const current = rate - i;
    if (current >= 1) stars.push(STAR_FULL);
    else if (current > 0) stars.push(STAR_HALF);
    else stars.push(STAR_EMPTY);
  }
  return stars.join("");
};

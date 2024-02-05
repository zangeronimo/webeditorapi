import { Pug } from "@web/webeditor/models/Pug";

export class Pagination extends Pug {
  private siblingsCount = 1;

  render = async (
    total: number,
    perPage: number = 20,
    currentPage: number = 1
  ) => {
    const lastPage = Math.ceil(total / perPage);
    const previousPages =
      currentPage > 1
        ? this.generatePagesArray(
            currentPage - 1 - this.siblingsCount,
            currentPage - 1
          )
        : [];
    const nextPages =
      currentPage < lastPage
        ? this.generatePagesArray(
            currentPage,
            Math.min(currentPage + this.siblingsCount, lastPage)
          )
        : [];
    const from = perPage * (currentPage - 1) + 1;
    const to = perPage * currentPage;

    return () =>
      this.renderFile("components/pagination", {
        total,
        from,
        to,
        currentPage,
        previousPages,
        nextPages,
        lastPage,
        siblingsCount: this.siblingsCount,
      });
  };

  private generatePagesArray = (from: number, to: number): number[] =>
    [...new Array(to - from)]
      ?.map((_, index) => 1 + +from + index)
      .filter((page) => page > 0);
}

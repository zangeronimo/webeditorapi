import { GetAllLevelFilterModel } from "@application/model/culinary/level";
import { LevelGetAll } from "@application/usecase/culinary/level";
import { ActiveEnum } from "@domain/enum";
import { container } from "tsyringe";
import pug from "pug";
import { CategoryGetAll } from "@application/usecase/culinary/category";
import { GetAllCategoryFilterModel } from "@application/model/culinary/category";

export class SideBar {
  readonly levelGetAll = container.resolve(LevelGetAll);
  readonly categoryGetAll = container.resolve(CategoryGetAll);
  readonly company = process.env.MAISRECEITAS!;

  render = async (pugFile: string) => {
    const model = new GetAllLevelFilterModel("");
    model.active = ActiveEnum.ACTIVE;
    model.orderBy = "name";
    model.page = 1;
    model.pageSize = 999;
    const levelsResult = await this.levelGetAll.executeAsync(
      model,
      this.company
    );
    const levels: any[] = [];
    for (let i = 0; i < levelsResult.itens.length; i++) {
      const level: any = levelsResult.itens[i];
      const model = new GetAllCategoryFilterModel("");
      model.active = ActiveEnum.ACTIVE;
      model.orderBy = "name";
      model.levelId = level.id;
      model.page = 1;
      model.pageSize = 999;
      const { itens: categories } = await this.categoryGetAll.executeAsync(
        model,
        this.company
      );
      level.categories = categories;
      levels.push(level);
    }
    return () =>
      pug.renderFile(pugFile, {
        levels,
      });
  };
}

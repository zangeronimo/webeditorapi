import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  GetAllLevelFilterModel,
  LevelCreateDataModel,
  LevelUpdateDataModel,
} from "@application/model/culinary/level";
import {
  LevelCreate,
  LevelDelete,
  LevelGetById,
  LevelUpdate,
} from "@application/usecase/culinary/level";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Level } from "@web/webeditor/views/culinary/level";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class LevelsRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  levelsGetById = container.resolve(LevelGetById);
  levelCreate = container.resolve(LevelCreate);
  levelUpdate = container.resolve(LevelUpdate);
  levelDelete = container.resolve(LevelDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.levels.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.levels.update),
      this.getById
    );
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.levels.update),
      this.create
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.levels.update),
      this.update
    );
    this.router.delete(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.levels.delete),
      this.delete
    );
  }

  private show = async (req: Request, res: Response) => {
    req.query.page = req.query.page ?? "1";
    req.query.pageSize = req.query.pageSize ?? "20";
    req.query.desc = req.query.desc ?? "false";
    const { header, sidebar } = await this.baseRender();
    const { company } = req.user;
    const level = new Level();
    const model = new GetAllLevelFilterModel(req.query);
    const { root, seo } = await level.render(model, company);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const level = await this.levelsGetById.executeAsync(id, company);
    return res.json(level);
  };

  private create = async (req: Request, res: Response) => {
    const { name, active } = req.body;
    const { company } = req.user;
    const model = new LevelCreateDataModel(name, active);
    const category = await this.levelCreate.executeAsync(model, company);
    return res.json(category);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, slug, name, active } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const { company } = req.user;
    const model = new LevelUpdateDataModel(id, slug, name, active);
    const level = await this.levelUpdate.executeAsync(model, company);
    return res.json(level);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const level = await this.levelDelete.executeAsync(id, company);
    return res.json(level);
  };
}

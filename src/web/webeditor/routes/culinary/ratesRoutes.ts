import { Messages } from "@application/messages/Messages";
import { Roles } from "@application/messages/Roles";
import {
  GetAllRatingFilterModel,
  RatingUpdateDataModel,
} from "@application/model/culinary/rating";
import {
  RatingDelete,
  RatingGetById,
  RatingUpdate,
} from "@application/usecase/culinary/rating";
import { Authorize } from "@web/webeditor/authorize";
import { Pug } from "@web/webeditor/models/Pug";
import { Rating } from "@web/webeditor/views/culinary/rating";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RatesRoutes extends Pug {
  router = Router();
  authorize = new Authorize();
  ratingsGetById = container.resolve(RatingGetById);
  ratingUpdate = container.resolve(RatingUpdate);
  ratingDelete = container.resolve(RatingDelete);

  constructor(readonly baseRender: any) {
    super();
    this.router.get(
      "/",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.ratings.view, true),
      this.show
    );
    this.router.get(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.ratings.update),
      this.getById
    );
    this.router.put(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.ratings.update),
      this.update
    );
    this.router.delete(
      "/:id",
      this.authorize.isAutenticated,
      this.authorize.userHasRole(Roles.culinary.ratings.delete),
      this.delete
    );
  }

  private show = async (req: Request, res: Response) => {
    req.query.page = req.query.page ?? "1";
    req.query.pageSize = req.query.pageSize ?? "20";
    req.query.desc = req.query.desc ?? "false";
    const { header, sidebar } = await this.baseRender();
    const { company } = req.user;
    const rating = new Rating();
    const model = new GetAllRatingFilterModel(req.query);
    const { root, seo } = await rating.render(model, company);
    return res.render("template", { root, seo, header, sidebar });
  };

  private getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const rating = await this.ratingsGetById.executeAsync(id, company);
    return res.json(rating);
  };

  private update = async (req: Request, res: Response) => {
    const { id: paramId } = req.params;
    const { id, rate, comment, active, recipeId, name } = req.body;
    if (id !== paramId) {
      throw new Error(Messages.invalidId);
    }
    const { company } = req.user;
    const model = new RatingUpdateDataModel(
      id,
      rate,
      comment,
      active,
      recipeId,
      name
    );
    const rating = await this.ratingUpdate.executeAsync(model, company);
    return res.json(rating);
  };

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { company } = req.user;
    const rating = await this.ratingDelete.executeAsync(id, company);
    return res.json(rating);
  };
}

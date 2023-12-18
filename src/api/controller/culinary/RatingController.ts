import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  IRatingGetAll,
  IRatingGetById,
  IRatingCreate,
  IRatingUpdate,
  IRatingDelete,
} from "@application/interface/usecase/culinary/rating";
import {
  RatingCreateDataModel,
  RatingUpdateDataModel,
  GetAllRatingFilterModel,
} from "@application/model/culinary/rating";
import { inject } from "@infra/di/Inject";
import { Request, Response, Router } from "express";

export class RatingController {
  @inject("IRatingGetAll")
  ratingGetAll?: IRatingGetAll;
  @inject("IRatingGetById")
  ratingGetById?: IRatingGetById;
  @inject("IRatingCreate")
  ratingCreate?: IRatingCreate;
  @inject("IRatingUpdate")
  ratingUpdate?: IRatingUpdate;
  @inject("IRatingDelete")
  ratingDelete?: IRatingDelete;

  router = Router();

  constructor(
    ensureAuthenticated: EnsureAuthenticated,
    ensureHasRole: EnsureHasRole
  ) {
    this.router.get(
      "/",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RATING_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RATING_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RATING_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RATING_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      ensureAuthenticated.execute,
      ensureHasRole.executeAsync("CULINARY_RATING_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllRatingFilterModel = new GetAllRatingFilterModel(req.query);
      const ratings = await this.ratingGetAll?.executeAsync(
        getAllRatingFilterModel,
        company
      );
      return res.json(ratings);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const rating = await this.ratingGetById?.executeAsync(id, company);
      return res.json(rating);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { rate, comment, name, active, recipeId } = req.body;
      const ratingCreateDataModel = new RatingCreateDataModel(
        rate,
        comment,
        active,
        recipeId,
        name
      );
      const rating = await this.ratingCreate?.executeAsync(
        ratingCreateDataModel,
        company
      );
      return res.status(201).json(rating);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, rate, comment, name, active, recipeId } = req.body;
      const ratingUpdateDataModel = new RatingUpdateDataModel(
        id,
        rate,
        comment,
        active,
        recipeId,
        name
      );
      const rating = await this.ratingUpdate?.executeAsync(
        ratingUpdateDataModel,
        company
      );
      return res.json(rating);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const rating = await this.ratingDelete?.executeAsync(id, company);
      return res.json(rating);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

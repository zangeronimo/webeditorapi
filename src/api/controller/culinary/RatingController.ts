import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  GetAllRatingFilterModel,
  RatingCreateDataModel,
  RatingUpdateDataModel,
} from "@application/model/culinary/rating";
import {
  RatingCreate,
  RatingDelete,
  RatingGetAll,
  RatingGetById,
  RatingUpdate,
} from "@application/usecase/culinary/rating";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class RatingController {
  router = Router();
  ratingGetAll = container.resolve(RatingGetAll);
  ratingGetById = container.resolve(RatingGetById);
  ratingCreate = container.resolve(RatingCreate);
  ratingUpdate = container.resolve(RatingUpdate);
  ratingDelete = container.resolve(RatingDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RATING_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RATING_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RATING_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RATING_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_RATING_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllRatingFilterModel = new GetAllRatingFilterModel(req.query);
      const ratings = await this.ratingGetAll.executeAsync(
        getAllRatingFilterModel,
        company
      );
      res.json(ratings);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const rating = await this.ratingGetById.executeAsync(id, company);
      res.json(rating);
    } catch (e: any) {
      res.status(400).json(e.message);
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
      const rating = await this.ratingCreate.executeAsync(
        ratingCreateDataModel,
        company
      );
      res.status(201).json(rating);
    } catch (e: any) {
      res.status(400).json(e.message);
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
      const rating = await this.ratingUpdate.executeAsync(
        ratingUpdateDataModel,
        company
      );
      res.json(rating);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const rating = await this.ratingDelete.executeAsync(id, company);
      res.json(rating);
    } catch (e: any) {
      res.status(400).json(e.message);
    }
  };
}

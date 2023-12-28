import { EnsureAuthenticated, EnsureHasRole } from "@api/midleware";
import {
  CategoryCreateDataModel,
  CategoryUpdateDataModel,
  GetAllCategoryFilterModel,
} from "@application/model/culinary/category";
import { CategoryCreate, CategoryDelete, CategoryGetAll, CategoryGetById, CategoryUpdate } from "@application/usecase/culinary/category";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class CategoryController {
  router = Router();
  categoryGetAll = container.resolve(CategoryGetAll);
  categoryGetById = container.resolve(CategoryGetById);
  categoryCreate = container.resolve(CategoryCreate);
  categoryUpdate = container.resolve(CategoryUpdate);
  categoryDelete = container.resolve(CategoryDelete);
  ensureAuthenticated = container.resolve(EnsureAuthenticated);
  ensureHasRole = container.resolve(EnsureHasRole);

  constructor() {
    this.router.get(
      "/",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_CATEGORY_VIEW"),
      this.getAllAsync
    );
    this.router.get(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_CATEGORY_VIEW"),
      this.getByIdAsync
    );
    this.router.post(
      "",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_CATEGORY_UPDATE"),
      this.createAsync
    );
    this.router.put(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_CATEGORY_UPDATE"),
      this.updateAsync
    );
    this.router.delete(
      "/:id",
      this.ensureAuthenticated.execute,
      this.ensureHasRole.executeAsync("CULINARY_CATEGORY_DELETE"),
      this.deleteAsync
    );
  }

  private getAllAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const getAllCategoryFilterModel = new GetAllCategoryFilterModel(
        req.query
      );
      const categories = await this.categoryGetAll.executeAsync(
        getAllCategoryFilterModel,
        company
      );
      return res.json(categories);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private getByIdAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const category = await this.categoryGetById.executeAsync(id, company);
      return res.json(category);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private createAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { name, active, levelId } = req.body;
      const categoryCreateDataModel = new CategoryCreateDataModel(
        name,
        active,
        levelId
      );
      const category = await this.categoryCreate.executeAsync(
        categoryCreateDataModel,
        company
      );
      return res.status(201).json(category);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private updateAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id, slug, name, active, levelId } = req.body;
      const categoryUpdateDataModel = new CategoryUpdateDataModel(
        id,
        slug,
        name,
        active,
        levelId
      );
      const category = await this.categoryUpdate.executeAsync(
        categoryUpdateDataModel,
        company
      );
      return res.json(category);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };

  private deleteAsync = async (req: Request, res: Response) => {
    try {
      const { company } = req.user;
      const { id } = req.params;
      const category = await this.categoryDelete.executeAsync(id, company);
      return res.json(category);
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

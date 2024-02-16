import { HasRole } from "@application/usecase/webeditor";
import { Authorize } from "@web/webeditor/authorize";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

export class UserHasPermissionRoutes {
  router = Router();
  authorize = new Authorize();
  hasRole = container.resolve(HasRole);

  constructor() {
    this.router.post(
      "/",
      this.authorize.isAutenticated,
      this.userHasPermission
    );
  }

  private userHasPermission = async (req: Request, res: Response) => {
    try {
      const { id: userId, company } = req.user;
      const { role } = req.body;
      const hasPermission = await this.hasRole.executeAsync(
        userId,
        company,
        role
      );
      return res.json({ hasPermission });
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

import { Request, Response, Router } from "express";
import { Pug } from "web/webeditor/models/Pug";

export class SignOutRoutes extends Pug {
  router = Router();

  constructor(readonly baseRender: any) {
    super();
    this.router.post("/", this.signOutAsync);
  }

  private signOutAsync = async (req: Request, res: Response) => {
    try {
      res.cookie("refreshToken", "", {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime()),
        secure: true,
      });
      return res.status(204).json();
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  };
}

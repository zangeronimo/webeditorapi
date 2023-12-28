import { Request, Response, Router } from "express";

export class Controller {
  router = Router();

  constructor(){
  this.router.get(
    "/",
    this.getAllAsync
  );
  }

  private getAllAsync = (req: Request, res: Response) => {
    try {
      return res.render("index", {name: "MaisReceitas"});
    } catch (e: any) {
      return res.status(400).json(e.message);
    }
  }
}

import { RefreshToken } from "@application/usecase/webeditor";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export class Authorize {
  refreshToken = container.resolve(RefreshToken);

  isAutenticated = async (req: Request, res: Response, next: NextFunction) => {
    const refresh = req.headers.cookie
      ?.split("; ")
      .find((item) => item.includes("refreshToken"))
      ?.replace("refreshToken=", "");
    console.log(req.headers);
    if (!refresh) return res.redirect("/sign-in");
    const { token } = await this.refreshToken.executeAsync(refresh)!;
    if (!token) return res.redirect("/sign-in");
    return next();
  };
}

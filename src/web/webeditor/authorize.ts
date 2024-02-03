import { RefreshToken } from "@application/usecase/webeditor";
import { JwtWebTokenProvider } from "@infra/provider";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export class Authorize {
  refreshToken = container.resolve(RefreshToken);
  tokenProvider = container.resolve(JwtWebTokenProvider);

  isAutenticated = async (req: Request, res: Response, next: NextFunction) => {
    const refresh = req.headers.cookie
      ?.split("; ")
      .find((item) => item.includes("refreshToken"))
      ?.replace("refreshToken=", "");
    if (!refresh) return res.redirect("/sign-in");
    const { token } = await this.refreshToken.executeAsync(refresh)!;
    if (!token) return res.redirect("/sign-in");
    const tokenPayloadModel = this.tokenProvider.verify(token.token);
    const { sub, company } = tokenPayloadModel!;
    req.user = { id: sub, company };
    return next();
  };
}

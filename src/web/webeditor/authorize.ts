import { Messages } from "@application/messages/Messages";
import { HasRole, RefreshToken } from "@application/usecase/webeditor";
import { JwtWebTokenProvider } from "@infra/provider";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export class Authorize {
  refreshToken = container.resolve(RefreshToken);
  tokenProvider = container.resolve(JwtWebTokenProvider);
  hasRole = container.resolve(HasRole);

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

  userHasRole = (role: string, redirect = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { id, company } = req.user;
      const hasPermission = await this.hasRole.executeAsync(id, company, role);
      if (!hasPermission) {
        return redirect
          ? res.redirect("/access-denied")
          : res.status(403).json(Messages.accessDenied);
      }
      return next();
    };
  };
}

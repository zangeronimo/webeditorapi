import { ITokenProvider } from "@application/interface/provider";
import { Messages } from "@application/messages/Messages";
import { inject } from "@infra/di";
import { NextFunction, Request, Response } from "express";

export class EnsureAuthenticated {
  @inject("ITokenProvider")
  tokenProvider?: ITokenProvider;

  execute = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      response.status(401).json(Messages.invalidJwtToken);
      return;
    }
    const [, token] = authHeader.split(" ");
    try {
      const tokenPayloadModel = this.tokenProvider?.verify(token);
      const { sub, company } = tokenPayloadModel!;
      request.user = { id: sub, company };
      return next();
    } catch {
      response.status(401).json(Messages.invalidJwtToken);
    }
  };
}

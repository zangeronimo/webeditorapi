import { ITokenProvider } from "@application/interface/provider/ITokenProvider";
import { Messages } from "@application/messages/Messages";
import { inject } from "@infra/di/Inject";
import { Request, Response, NextFunction } from "express";

export class EnsureAuthenticated {
  @inject("ITokenProvider")
  tokenProvider?: ITokenProvider;

  Execute = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      response.status(401).json(Messages.InvalidJwtToken);
      return;
    }
    const [, token] = authHeader.split(" ");
    try {
      const tokenPayloadModel = this.tokenProvider?.Verify(token);
      const { sub, company } = tokenPayloadModel!;
      request.user = { id: sub, company };
      return next();
    } catch {
      response.status(401).json(Messages.InvalidJwtToken);
    }
  };
}

import { ITokenProvider } from "@application/interface/provider";
import { Messages } from "@application/messages/Messages";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnsureAuthenticated implements IEnsureAuthenticated {
  constructor(
    @inject("ITokenProvider")
    readonly tokenProvider: ITokenProvider
  ) {}

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
      const tokenPayloadModel = this.tokenProvider.verify(token);
      const { sub, company } = tokenPayloadModel!;
      request.user = { id: sub, company };
      return next();
    } catch {
      response.status(401).json(Messages.invalidJwtToken);
    }
  };
}

export interface IEnsureAuthenticated {
  execute: any
}

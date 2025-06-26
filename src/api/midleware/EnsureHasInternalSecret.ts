import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export class EnsureHasInternalSecret implements IEnsureHasInternalSecret {
  constructor() {}

  executeAsync = () => {
    return async (
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<void> => {
      const internalSecret = request.headers["x-internal-secret"];
      const clientId = request.headers["x-client-id"];
      if (internalSecret !== process.env.CLIENT_INTERNAL_SECRET || !clientId) {
        response.status(401).json({ message: "Unauthorized" });
        return;
      }
      request.user = { id: "", company: clientId as string };
      return next();
    };
  };
}

export interface IEnsureHasInternalSecret {
  executeAsync: any;
}

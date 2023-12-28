import { IHasRole } from "@application/interface/usecase/webeditor";
import { Messages } from "@application/messages/Messages";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnsureHasRole implements IEnsureHasRole {
  constructor(
    @inject("IHasRole")
    readonly hasRole: IHasRole,
  ) {}


  executeAsync = (role: string) => {
    return async (
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<void> => {
      const { id, company } = request.user;
      try {
        const hasPermission = await this.hasRole.executeAsync(
          id,
          company,
          role
        );
        if (!hasPermission) {
          response.status(403).json(Messages.accessDenied);
          return;
        }
        return next();
      } catch {
        response.status(403).json(Messages.accessDenied);
      }
    };
  };
}

export interface IEnsureHasRole {
  executeAsync: any
}

import { IHasRole } from "@application/interface/usecase/webeditor/IHasRole";
import { Messages } from "@application/messages/Messages";
import { inject } from "@infra/di/Inject";
import { NextFunction, Request, Response } from "express";

export class EnsureHasRole {
  @inject("IHasRole")
  hasRole?: IHasRole;

  execute = (role: string) => {
    return async (
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<void> => {
      const { id, company } = request.user;
      try {
        const hasPermission = await this.hasRole?.executeAsync(
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

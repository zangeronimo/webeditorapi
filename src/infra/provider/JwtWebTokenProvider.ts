import { ITokenProvider } from "@application/interface/provider";
import { Messages } from "@application/messages/Messages";
import { TokenPayloadModel } from "@application/model/webeditor/TokenPayloadModel";
import { User } from "@domain/entity/webeditor/User";
import { sign, verify } from "jsonwebtoken";

export class JwtWebTokenProvider implements ITokenProvider {
  generate(user: User, date: Date, exp: number): string {
    const token = sign(
      {
        sub: user.id,
        iat: date.getTime(),
        exp,
        company: user.companyId,
      },
      "secret"
    );
    return token;
  }

  verify(token: string) {
    const payload: any = verify(token, "secret");
    const dateNow = new Date().getTime();
    if (dateNow - payload.exp >= 0) {
      throw new Error(Messages.invalidJwtToken);
    }
    return new TokenPayloadModel(
      payload.iat,
      payload.exp,
      payload.sub,
      payload.company
    );
  }
}

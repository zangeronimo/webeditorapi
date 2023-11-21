import { ITokenProvider } from "@application/interface/provider/ITokenProvider";
import { Messages } from "@application/messages/Messages";
import { TokenPayloadModel } from "@application/model/webeditor/TokenPayloadModel";
import { User } from "@domain/entity/webeditor/User";
import { sign, verify } from "jsonwebtoken";

export class JwtWebTokenProvider implements ITokenProvider {
  Generate(user: User, date: Date): string {
    const token = sign(
      {
        sub: user.id,
        iat: date.getTime(),
        exp: date.getTime() + 14400,
        company: user.companyId,
      },
      "secret"
    );
    return token;
  }
  Verify(token: string) {
    const payload: any = verify(token, "secret");
    const dateNow = new Date().getTime();
    if (dateNow - payload.exp >= 0) {
      throw new Error(Messages.InvalidJwtToken);
    }
    return new TokenPayloadModel(
      payload.iat,
      payload.exp,
      payload.sub,
      payload.company
    );
  }
}

import { TokenPayloadModel } from "@application/model/webeditor/TokenPayloadModel";
import { User } from "@domain/entity/webeditor/User";

export interface ITokenProvider {
  Generate(user: User, date: Date, exp: number): string;
  Verify(token: string): TokenPayloadModel;
}

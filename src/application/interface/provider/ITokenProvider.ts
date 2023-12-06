import { TokenPayloadModel } from "@application/model/webeditor/TokenPayloadModel";
import { User } from "@domain/entity/webeditor/User";

export interface ITokenProvider {
  generate(user: User, date: Date, exp: number): string;
  verify(token: string): TokenPayloadModel;
}

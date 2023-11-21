import { TokenPayloadModel } from "@application/model/webeditor/TokenPayloadModel";
import { User } from "@domain/entity/webeditor/User";

export interface ITokenProvider {
  Generate(user: User, date: Date): string;
  Verify(token: string): TokenPayloadModel;
}

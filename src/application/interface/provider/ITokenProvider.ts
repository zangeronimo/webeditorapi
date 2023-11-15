import { TokenPayloadModel } from "@application/model/TokenPayloadModel";
import { User } from "@domain/entity/User";

export interface ITokenProvider {
  Generate(user: User, date: Date): string;
  Verify(token: string): TokenPayloadModel;
}

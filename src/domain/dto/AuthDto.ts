export class AuthDto {
  public Token: string;

  constructor(token: string) {
    this.Token = token;
  }
}

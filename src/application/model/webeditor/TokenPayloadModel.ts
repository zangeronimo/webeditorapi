export class TokenPayloadModel {
  constructor(
    readonly iat: number,
    readonly exp: number,
    readonly sub: string,
    readonly company: string
  ) {}
}

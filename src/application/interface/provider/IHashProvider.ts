export interface IHashProvider {
  generateHashAsync(payload: string): Promise<string>;
  compareHashAsync(payload: string, hashed: string): Promise<boolean>;
}

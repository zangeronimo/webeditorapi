export interface IHasRole {
  executeAsync(
    userId: string,
    companyId: string,
    role: string
  ): Promise<boolean>;
}

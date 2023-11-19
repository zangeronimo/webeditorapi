export interface IHasRole {
  ExecuteAsync(
    userId: string,
    companyId: string,
    role: string
  ): Promise<boolean>;
}

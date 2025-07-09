export interface IRecipeImport {
  executeAsync(id: string, company: string): Promise<void>;
}

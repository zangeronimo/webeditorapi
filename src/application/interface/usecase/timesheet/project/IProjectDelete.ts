export interface IProjectDelete {
  executeAsync(id: string, company: string): Promise<void>;
}

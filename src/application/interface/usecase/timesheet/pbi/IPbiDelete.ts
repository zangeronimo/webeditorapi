export interface IPbiDelete {
  executeAsync(id: string, company: string): Promise<void>;
}

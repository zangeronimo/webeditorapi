export interface IPbiStatusDelete {
  executeAsync(id: string, company: string): Promise<void>;
}

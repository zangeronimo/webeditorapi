export interface DbContext {
  queryAsync(statement: string, data: any): Promise<any>;
  closeAsync(): Promise<void>;
}

export interface DbContext {
  queryAsync(statement: string, data: any, transaction?: boolean): Promise<any>;
  commitAsync(): Promise<void>;
  closeAsync(): Promise<void>;
}

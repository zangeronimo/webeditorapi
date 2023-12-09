export interface ITaskRegisterWork {
  executeAsync(id: string, userId: string, company: string): Promise<void>;
}

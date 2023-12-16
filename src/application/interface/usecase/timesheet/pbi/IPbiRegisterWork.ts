export interface IPbiRegisterWork {
  executeAsync(id: string, userId: string, company: string): Promise<void>;
}

export interface INewsletterService {
  createAsync(name: string, email: string, company: string): Promise<void>;
}

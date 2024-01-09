import { GetAllNewsletterFilterModel } from "@application/model/institutional/newsletter";
import { Newsletter } from "@domain/entity/institutional";

export interface INewsletterRepository {
  getByIdAsync(id: string, company: string): Promise<Newsletter | null>;
  getByEmailAsync(email: string, company: string): Promise<Newsletter | null>;
  getAllAsync(
    model: GetAllNewsletterFilterModel,
    company: string
  ): Promise<{ itens: Newsletter[]; total: number }>;
  updateAsync(newsletter: Newsletter): Promise<Newsletter>;
  saveAsync(newsletter: Newsletter): Promise<Newsletter>;
  deleteAsync(newsletter: Newsletter, date: Date): Promise<Newsletter>;
}

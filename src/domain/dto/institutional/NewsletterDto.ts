import { Newsletter } from "@domain/entity/institutional";

export class NewsletterDto {
  id: string;
  name: string;
  email: string;
  active: number;
  confirmedAt?: Date;
  confirmedIP?: string;

  constructor(newsletter: Newsletter) {
    this.id = newsletter.id;
    this.name = newsletter.name;
    this.email = newsletter.email;
    this.active = newsletter.active.valueOf();
    this.confirmedAt = newsletter.confirmedAt;
    this.confirmedIP = newsletter.confirmedIP;
  }
}

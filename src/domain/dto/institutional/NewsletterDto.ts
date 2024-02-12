import { Newsletter } from "@domain/entity/institutional";
import { DtoBase } from "../DtoBase";

export class NewsletterDto extends DtoBase {
  name: string;
  email: string;
  active: number;
  confirmedAt?: Date;
  confirmedIP?: string;

  constructor(newsletter: Newsletter) {
    super(newsletter.id, newsletter.createdAt, newsletter.updatedAt);
    this.name = newsletter.name;
    this.email = newsletter.email;
    this.active = newsletter.active.valueOf();
    this.confirmedAt = newsletter.confirmedAt;
    this.confirmedIP = newsletter.confirmedIP;
  }
}

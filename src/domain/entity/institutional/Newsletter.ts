import {
  NewsletterCreateDataModel,
  NewsletterUpdateDataModel,
} from "@application/model/institutional/newsletter";
import { ActiveEnum } from "@domain/enum";

export class Newsletter {
  private _id: string;
  private _name: string;
  private _email: string;
  private _active: ActiveEnum;
  private _updatedAt?: Date;
  private _confirmedAt?: Date;
  private _confirmedIP?: string;

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get active() {
    return this._active;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get confirmedAt() {
    return this._confirmedAt;
  }
  get confirmedIP() {
    return this._confirmedIP;
  }

  private constructor(
    id: string,
    name: string,
    email: string,
    active: ActiveEnum,
    readonly companyId: string
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._active = active;
  }

  static restore(
    id: string,
    name: string,
    email: string,
    active: ActiveEnum,
    companyId: string
  ): Newsletter {
    return new Newsletter(id, name, email, active, companyId);
  }

  static create(
    newsletterData: NewsletterCreateDataModel,
    companyId: string
  ): Newsletter {
    const newsletter = new Newsletter(
      crypto.randomUUID(),
      newsletterData.name,
      newsletterData.email,
      newsletterData.active,
      companyId
    );
    return newsletter;
  }

  update(newsletterData: NewsletterUpdateDataModel) {
    this._updatedAt = new Date();
    this._name = newsletterData.name;
    this._email = newsletterData.email;
    this._active = newsletterData.active;
  }
}

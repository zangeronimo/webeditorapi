import {
  NewsletterCreateDataModel,
  NewsletterUpdateDataModel,
} from "@application/model/institutional/newsletter";
import { ActiveEnum } from "@domain/enum";
import { EntityBase } from "../EntityBase";

export class Newsletter extends EntityBase {
  private _name: string;
  private _email: string;
  private _active: ActiveEnum;
  private _confirmedAt?: Date;
  private _confirmedIP?: string;

  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get active() {
    return this._active;
  }
  get confirmedAt() {
    return this._confirmedAt;
  }
  get confirmedIP() {
    return this._confirmedIP;
  }

  private constructor(
    name: string,
    email: string,
    active: ActiveEnum,
    companyId: string,
    confirmedAt?: Date,
    confirmedIP?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(companyId, id, createdAt, updatedAt);
    this._name = name;
    this._email = email;
    this._active = active;
    (this._confirmedAt = confirmedAt), (this._confirmedIP = confirmedIP);
  }

  static restore(
    id: string,
    name: string,
    email: string,
    active: ActiveEnum,
    companyId: string,
    confirmedAt: Date,
    confirmedIP: string,
    createdAt: Date,
    updatedAt: Date
  ): Newsletter {
    return new Newsletter(
      name,
      email,
      active,
      companyId,
      confirmedAt,
      confirmedIP,
      id,
      createdAt,
      updatedAt
    );
  }

  static create(
    newsletterData: NewsletterCreateDataModel,
    companyId: string
  ): Newsletter {
    const newsletter = new Newsletter(
      newsletterData.name,
      newsletterData.email,
      newsletterData.active,
      companyId
    );
    return newsletter;
  }

  update(newsletterData: NewsletterUpdateDataModel) {
    this.updateBase();
    this._name = newsletterData.name;
    this._email = newsletterData.email;
    this._active = newsletterData.active;
  }
}

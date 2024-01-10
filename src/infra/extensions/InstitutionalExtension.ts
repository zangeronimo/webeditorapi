import { INewsletterRepository } from "@application/interface/repository/institutional";
import { INewsletterService } from "@application/interface/service/institutional/INewsletterService";
import {
  INewsletterGetAll,
  INewsletterGetById,
  INewsletterCreate,
  INewsletterUpdate,
  INewsletterDelete,
} from "@application/interface/usecase/institutional/newsletter";
import { NewsletterService } from "@application/service/institutional/NewsletterService";
import {
  NewsletterGetAll,
  NewsletterGetById,
  NewsletterCreate,
  NewsletterUpdate,
  NewsletterDelete,
} from "@application/usecase/institutional/newsletter";
import { NewsletterRepository } from "@infra/repository/institutional";
import { container } from "tsyringe";

export class InstitutionalExtension {
  static init() {
    // Registry Repositories
    container.registerSingleton<INewsletterRepository>(
      "INewsletterRepository",
      NewsletterRepository
    );

    // Registry Services
    container.registerSingleton<INewsletterService>(
      "INewsletterService",
      NewsletterService
    );

    // Registry Level useCases
    container.registerSingleton<INewsletterGetAll>(
      "INewsletterGetAll",
      NewsletterGetAll
    );
    container.registerSingleton<INewsletterGetById>(
      "INewsletterGetById",
      NewsletterGetById
    );
    container.registerSingleton<INewsletterCreate>(
      "INewsletterCreate",
      NewsletterCreate
    );
    container.registerSingleton<INewsletterUpdate>(
      "INewsletterUpdate",
      NewsletterUpdate
    );
    container.registerSingleton<INewsletterDelete>(
      "INewsletterDelete",
      NewsletterDelete
    );
  }
}

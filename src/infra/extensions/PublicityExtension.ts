import {
  IBannerCategoryRepository,
  IBannerRepository,
} from "@application/interface/repository/publicity";
import { IBannerService } from "@application/interface/service/publicity/IBannerService";
import {
  IBannerCreate,
  IBannerDelete,
  IBannerGetAll,
  IBannerGetById,
  IBannerUpdate,
} from "@application/interface/usecase/publicity/banner";
import {
  IBannerCategoryCreate,
  IBannerCategoryDelete,
  IBannerCategoryGetById,
  IBannerCategoryUpdate,
  IBannersCategoriesGetAll,
} from "@application/interface/usecase/publicity/bannerCategory";
import { BannerService } from "@application/service/publicity/BannerService";
import {
  BannerCreate,
  BannerDelete,
  BannerGetAll,
  BannerGetById,
  BannerUpdate,
} from "@application/usecase/publicity/banner";
import {
  BannerCategoryCreate,
  BannerCategoryDelete,
  BannerCategoryGetAll,
  BannerCategoryGetById,
  BannerCategoryUpdate,
} from "@application/usecase/publicity/bannerCategory";
import {
  BannerCategoryRepository,
  BannerRepository,
} from "@infra/repository/publicity";
import { container } from "tsyringe";

export class PublicityExtension {
  static init() {
    // Registry Repositories
    container.registerSingleton<IBannerCategoryRepository>(
      "IBannerCategoryRepository",
      BannerCategoryRepository
    );
    container.registerSingleton<IBannerRepository>(
      "IBannerRepository",
      BannerRepository
    );

    // Registry Services
    container.registerSingleton<IBannerService>(
      "IBannerService",
      BannerService
    );

    // Registry Level useCases
    container.registerSingleton<IBannersCategoriesGetAll>(
      "IBannersCategoriesGetAll",
      BannerCategoryGetAll
    );
    container.registerSingleton<IBannerCategoryGetById>(
      "IBannerCategoryGetById",
      BannerCategoryGetById
    );
    container.registerSingleton<IBannerCategoryCreate>(
      "IBannerCategoryCreate",
      BannerCategoryCreate
    );
    container.registerSingleton<IBannerCategoryUpdate>(
      "IBannerCategoryUpdate",
      BannerCategoryUpdate
    );
    container.registerSingleton<IBannerCategoryDelete>(
      "IBannerCategoryDelete",
      BannerCategoryDelete
    );

    container.registerSingleton<IBannerGetAll>("IBannerGetAll", BannerGetAll);
    container.registerSingleton<IBannerGetById>(
      "IBannerGetById",
      BannerGetById
    );
    container.registerSingleton<IBannerCreate>("IBannerCreate", BannerCreate);
    container.registerSingleton<IBannerUpdate>("IBannerUpdate", BannerUpdate);
    container.registerSingleton<IBannerDelete>("IBannerDelete", BannerDelete);
  }
}

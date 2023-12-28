import { IClientRepository, IEpicRepository, IPbiRepository, IPbiStatusRepository, IProjectRepository } from "@application/interface/repository/timesheet";
import { IClientCreate, IClientDelete, IClientGetAll, IClientGetById, IClientUpdate } from "@application/interface/usecase/timesheet/client";
import { IEpicCreate, IEpicDelete, IEpicGetAll, IEpicGetById, IEpicUpdate } from "@application/interface/usecase/timesheet/epic";
import { IPbiCreate, IPbiDelete, IPbiGetAll, IPbiGetById, IPbiRegisterWork, IPbiUpdate } from "@application/interface/usecase/timesheet/pbi";
import { IPbiStatusCreate, IPbiStatusDelete, IPbiStatusGetAll, IPbiStatusGetById, IPbiStatusUpdate } from "@application/interface/usecase/timesheet/pbiStatus";
import { IProjectCreate, IProjectDelete, IProjectGetAll, IProjectGetById, IProjectUpdate } from "@application/interface/usecase/timesheet/project";
import {
  ClientCreate,
  ClientDelete,
  ClientGetAll,
  ClientGetById,
  ClientUpdate,
} from "@application/usecase/timesheet/client";
import {
  EpicCreate,
  EpicDelete,
  EpicGetAll,
  EpicGetById,
  EpicUpdate,
} from "@application/usecase/timesheet/epic";
import {
  PbiCreate,
  PbiDelete,
  PbiGetAll,
  PbiGetById,
  PbiRegisterWork,
  PbiUpdate,
} from "@application/usecase/timesheet/pbi";
import {
  PbiStatusCreate,
  PbiStatusDelete,
  PbiStatusGetAll,
  PbiStatusGetById,
  PbiStatusUpdate,
} from "@application/usecase/timesheet/pbiStatus";
import {
  ProjectCreate,
  ProjectDelete,
  ProjectGetAll,
  ProjectGetById,
  ProjectUpdate,
} from "@application/usecase/timesheet/project";
import {
  ClientRepository,
  EpicRepository,
  PbiRepository,
  PbiStatusRepository,
  ProjectRepository,
} from "@infra/repository/timesheet";
import { container } from "tsyringe";

export class TimeSheetExtension {
  static init() {
    // Registry Repositories
    container.registerSingleton<IClientRepository>(
      "IClientRepository",
      ClientRepository
    );
    container.registerSingleton<IProjectRepository>(
      "IProjectRepository",
      ProjectRepository
    );
    container.registerSingleton<IEpicRepository>(
      "IEpicRepository",
      EpicRepository
    );
    container.registerSingleton<IPbiRepository>(
      "IPbiRepository",
      PbiRepository
    );
    container.registerSingleton<IPbiStatusRepository>(
      "IPbiStatusRepository",
      PbiStatusRepository
    );

    // Registry Client useCases
    container.registerSingleton<IClientGetAll>("IClientGetAll", ClientGetAll);
    container.registerSingleton<IClientGetById>("IClientGetById", ClientGetById);
    container.registerSingleton<IClientCreate>("IClientCreate", ClientCreate);
    container.registerSingleton<IClientUpdate>("IClientUpdate", ClientUpdate);
    container.registerSingleton<IClientDelete>("IClientDelete", ClientDelete);

    // Registry Project useCases
    container.registerSingleton<IProjectGetAll>("IProjectGetAll", ProjectGetAll);
    container.registerSingleton<IProjectGetById>("IProjectGetById", ProjectGetById);
    container.registerSingleton<IProjectCreate>("IProjectCreate", ProjectCreate);
    container.registerSingleton<IProjectUpdate>("IProjectUpdate", ProjectUpdate);
    container.registerSingleton<IProjectDelete>("IProjectDelete", ProjectDelete);

    // Registry Epic useCases
    container.registerSingleton<IEpicGetAll>("IEpicGetAll", EpicGetAll);
    container.registerSingleton<IEpicGetById>("IEpicGetById", EpicGetById);
    container.registerSingleton<IEpicCreate>("IEpicCreate", EpicCreate);
    container.registerSingleton<IEpicUpdate>("IEpicUpdate", EpicUpdate);
    container.registerSingleton<IEpicDelete>("IEpicDelete", EpicDelete);

    // Registry Pbi useCases
    container.registerSingleton<IPbiGetAll>("IPbiGetAll", PbiGetAll);
    container.registerSingleton<IPbiGetById>("IPbiGetById", PbiGetById);
    container.registerSingleton<IPbiCreate>("IPbiCreate", PbiCreate);
    container.registerSingleton<IPbiUpdate>("IPbiUpdate", PbiUpdate);
    container.registerSingleton<IPbiRegisterWork>("IPbiRegisterWork", PbiRegisterWork);
    container.registerSingleton<IPbiDelete>("IPbiDelete", PbiDelete);

    // Registry PbiStatus useCases
    container.registerSingleton<IPbiStatusGetAll>("IPbiStatusGetAll", PbiStatusGetAll);
    container.registerSingleton<IPbiStatusGetById>("IPbiStatusGetById", PbiStatusGetById);
    container.registerSingleton<IPbiStatusCreate>("IPbiStatusCreate", PbiStatusCreate);
    container.registerSingleton<IPbiStatusUpdate>("IPbiStatusUpdate", PbiStatusUpdate);
    container.registerSingleton<IPbiStatusDelete>("IPbiStatusDelete", PbiStatusDelete);
  }
}

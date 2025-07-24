import { GetAllClientFilterModel } from "@application/model/timesheet/client";
import { PaginatorResultDto } from "@domain/dto/PaginatorResultDto";
import { ClientDto } from "@domain/dto/timesheet";

export interface IClientGetAll {
  executeAsync(
    model: GetAllClientFilterModel,
    company: string
  ): Promise<PaginatorResultDto<ClientDto[]>>;
}

import { Module } from "@domain/entity/webeditor/Module";

export class CompanyUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly modules: Module[]
  ) {}
}

import { Module } from "@domain/entity/webeditor";

export class CompanyUpdateDataModel {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly modules: Module[]
  ) {}
}

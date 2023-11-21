import { Module } from "@domain/entity/webeditor/Module";

export class CompanyCreateDataModel {
  constructor(readonly name: string, readonly modules: Module[]) {}
}

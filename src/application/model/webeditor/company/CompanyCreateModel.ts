import { Module } from "@domain/entity/webeditor";

export class CompanyCreateDataModel {
  constructor(readonly name: string, readonly modules: Module[]) {}
}

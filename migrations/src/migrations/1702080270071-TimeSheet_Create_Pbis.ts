import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TimeSheetCreatePbis1702080270071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "timesheet_pbis",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "sequence",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar(200)",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "status",
            type: "int",
            default: 0,
          },
          {
            name: "sort_order",
            type: "int",
            default: 0,
          },
          {
            name: "timesheet_pbis_status_id",
            type: "uuid",
          },
          {
            name: "timesheet_epics_id",
            type: "uuid",
          },
          {
            name: "webeditor_companies_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
        ],
        foreignKeys: [
          {
            name: "TimesheetPbiStatus",
            referencedTableName: "timesheet_pbis_status",
            referencedColumnNames: ["id"],
            columnNames: ["timesheet_pbis_status_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "TimesheetEpic",
            referencedTableName: "timesheet_epics",
            referencedColumnNames: ["id"],
            columnNames: ["timesheet_epics_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "WebeditorCompanies",
            referencedTableName: "webeditor_companies",
            referencedColumnNames: ["id"],
            columnNames: ["webeditor_companies_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("timesheet_pbis");
  }
}

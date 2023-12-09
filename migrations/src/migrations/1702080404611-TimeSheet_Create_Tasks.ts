import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TimeSheetCreateTasks1702080404611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "timesheet_tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
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
            name: "timesheet_pbis_id",
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
            name: "TimesheetPbi",
            referencedTableName: "timesheet_pbis",
            referencedColumnNames: ["id"],
            columnNames: ["timesheet_pbis_id"],
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
    await queryRunner.dropTable("timesheet_tasks");
  }
}
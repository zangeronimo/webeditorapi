import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TimeSheetCreateProjects1702079792337
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "timesheet_projects",
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
            name: "timesheet_clients_id",
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
            name: "TimesheetClient",
            referencedTableName: "timesheet_clients",
            referencedColumnNames: ["id"],
            columnNames: ["timesheet_clients_id"],
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
    await queryRunner.dropTable("timesheet_projects");
  }
}

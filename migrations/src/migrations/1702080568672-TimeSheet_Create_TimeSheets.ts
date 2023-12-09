import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TimeSheetCreateTimeSheets1702080568672
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "timesheet_entries",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "point_date",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "entry_type",
            type: "enum",
            enum: ["open", "close"],
            enumName: "entryTypeEnum",
          },
          {
            name: "timesheet_tasks_id",
            type: "uuid",
          },
          {
            name: "webeditor_users_id",
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
            name: "TimesheetTasks",
            referencedTableName: "timesheet_tasks",
            referencedColumnNames: ["id"],
            columnNames: ["timesheet_tasks_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "WebeditorUsers",
            referencedTableName: "webeditor_users",
            referencedColumnNames: ["id"],
            columnNames: ["webeditor_users_id"],
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
    await queryRunner.dropTable("timesheet_entries");
  }
}

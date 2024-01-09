import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InstituticalCreateNewsletter1704829464172
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "institutional_newsletters",
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
            type: "varchar(150)",
            isNullable: true,
            default: null,
          },
          {
            name: "email",
            type: "varchar(150)",
          },
          {
            name: "confirmed_at",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
          {
            name: "confirmed_ip",
            type: "varchar(50)",
            isNullable: true,
            default: null,
          },
          {
            name: "active",
            type: "int",
            default: 1,
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
          {
            name: "webeditor_companies_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
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
    await queryRunner.dropTable("institutional_newsletters");
  }
}

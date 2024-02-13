import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePublicityBanner1707831274231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "publicity_banner",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar(45)",
            isNullable: false,
          },
          {
            name: "url",
            type: "varchar(255)",
            isNullable: false,
          },
          {
            name: "image",
            type: "varchar(100)",
            isNullable: false,
          },
          {
            name: "order",
            type: "int",
            default: 0,
          },
          {
            name: "active",
            type: "int",
            default: 1,
          },
          {
            name: "views",
            type: "int",
            default: 0,
          },
          {
            name: "clicks",
            type: "int",
            default: 0,
          },
          {
            name: "webeditor_companies_id",
            type: "uuid",
          },
          {
            name: "publicity_banner_category_id",
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
            name: "WebeditorCompanies",
            referencedTableName: "webeditor_companies",
            referencedColumnNames: ["id"],
            columnNames: ["webeditor_companies_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "BannerCategory",
            referencedTableName: "publicity_banner_category",
            referencedColumnNames: ["id"],
            columnNames: ["publicity_banner_category_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("publicity_banner");
  }
}

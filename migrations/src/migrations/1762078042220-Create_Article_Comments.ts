import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArticleComments1762078042220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "article_comments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "comment",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "article_id",
            type: "uuid",
          },
          {
            name: "webeditor_companies_id",
            type: "uuid",
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
        ],
        foreignKeys: [
          {
            name: "Article",
            referencedTableName: "article_articles",
            referencedColumnNames: ["id"],
            columnNames: ["article_id"],
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
    await queryRunner.dropTable("article_comments");
  }
}

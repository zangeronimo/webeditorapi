import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArticles1761994521953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "article_articles",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "slug",
            type: "varchar",
            length: "120",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "120",
            isNullable: false,
          },
          {
            name: "short_description",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "full_description",
            type: "text",
            isNullable: true,
          },
          {
            name: "content",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "image_url",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "meta_title",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "meta_description",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "keywords",
            type: "varchar",
            isArray: true,
            isNullable: true,
          },
          {
            name: "schema_jsonld",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "related_recipe_ids",
            type: "uuid",
            isArray: true,
            isNullable: true,
          },
          {
            name: "views",
            type: "int",
            default: 0,
          },
          {
            name: "likes",
            type: "int",
            default: 0,
          },
          {
            name: "active",
            type: "int",
            default: 1,
          },
          {
            name: "published_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "webeditor_companies_id",
            type: "uuid",
            isNullable: false,
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
            name: "FK_WebeditorCompany",
            columnNames: ["webeditor_companies_id"],
            referencedTableName: "webeditor_companies",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("article_articles");
  }
}

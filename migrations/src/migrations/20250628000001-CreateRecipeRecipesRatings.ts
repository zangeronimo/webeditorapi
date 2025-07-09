import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateRecipeRecipesRatings20250628000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recipe_recipes_ratings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "rate",
            type: "int",
          },
          {
            name: "name",
            type: "varchar(150)",
            isNullable: true,
          },
          {
            name: "comment",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "recipe_recipes_id",
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
            name: "RecipeRecipes",
            referencedTableName: "recipe_recipes",
            referencedColumnNames: ["id"],
            columnNames: ["recipe_recipes_id"],
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
    await queryRunner.dropTable("recipe_recipes_ratings");
  }
}

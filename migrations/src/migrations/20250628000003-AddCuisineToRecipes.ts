import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCuisineToRecipes20250628000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "recipe_recipes",
      new TableColumn({
        name: "cuisine",
        type: "varchar",
        length: "100",
        isNullable: true,
        comment: "Tipo de cozinha (ex: brasileira, italiana, mexicana)",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("recipe_recipes", "cuisine");
  }
}

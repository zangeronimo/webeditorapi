import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddImportedToRecipes20250628000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "recipes",
      new TableColumn({
        name: "imported",
        type: "int",
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("recipes", "imported");
  }
}

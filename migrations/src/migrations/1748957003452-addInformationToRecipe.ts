import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addInformationToRecipe1748957003452 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "recipes",
      new TableColumn({
        name: "more_information",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("recipes", "more_information");
  }
}

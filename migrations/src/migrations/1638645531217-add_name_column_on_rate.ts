import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class addNameColumnOnRate1638645531217 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'recipe_ratings',
      new TableColumn({
        name: 'name',
        type: 'varchar(150)',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('recipe_ratings', 'name');
  }

}

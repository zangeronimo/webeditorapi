import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class addUrlToMktProduct1639578051419 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'mkt_products',
      new TableColumn({
        name: 'url',
        type: 'varchar(200)',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('mkt_products', 'url');
  }

}

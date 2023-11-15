import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class createMktProducts1639312771110 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mkt_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'slug',
            type: 'varchar(45)',
            isNullable: false,
          },
          {
            name: 'banner',
            type: 'varchar(100)',
            isNullable: true,
            default: null,
          },
          {
            name: 'title',
            type: 'varchar(45)',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'mkt_categories_id',
            type: 'uuid',
          },
          {
            name: 'webeditor_companies_id',
            type: 'uuid',
          },
          {
            name: 'active',
            type: 'int',
            default: 1,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
        foreignKeys: [
          {
            name: 'MktCategory',
            referencedTableName: 'mkt_categories',
            referencedColumnNames: ['id'],
            columnNames: ['mkt_categories_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'WebeditorCompanies',
            referencedTableName: 'webeditor_companies',
            referencedColumnNames: ['id'],
            columnNames: ['webeditor_companies_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mkt_products');
  }

}

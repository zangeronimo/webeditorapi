import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateWebeditorUser1628288669418 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'webeditor_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar(150)',
          },
          {
            name: 'email',
            type: 'varchar(150)',
          },
          {
            name: 'password',
            type: 'varchar(100)',
          },
          {
            name: 'webeditor_companies_id',
            type: 'uuid',
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
    await queryRunner.dropTable('webeditor_users');
  }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateWebeditorCompaniesWebeditorModules1628290976888 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'webeditor_companies_has_webeditor_modules',
      columns: [
        {
          name: 'webeditor_companies_id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'webeditor_modules_id',
          type: 'uuid',
          isPrimary: true,
        },
      ],
      foreignKeys: [
        {
          columnNames: ['webeditor_companies_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'webeditor_companies',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          columnNames: ['webeditor_modules_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'webeditor_modules',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('webeditor_companies_has_webeditor_modules');
  }
}

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateInstitutionalPage1632568063669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'institutional_pages',
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
      await queryRunner.dropTable('institutional_pages');
    }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateWebeditorRoles1628289827779 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'webeditor_roles',
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
            type: 'varchar(50)',

          },
          {
            name: 'label',
            type: 'varchar(50)',
          },
          {
            name: 'webeditor_modules_id',
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
            name: 'WebeditorModules',
            referencedTableName: 'webeditor_modules',
            referencedColumnNames: ['id'],
            columnNames: ['webeditor_modules_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('webeditor_roles');
  }

}

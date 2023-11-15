import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateWebeditorUsersWebeditorRoles1628291372859 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'webeditor_users_has_webeditor_roles',
      columns: [
        {
          name: 'webeditor_users_id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'webeditor_roles_id',
          type: 'uuid',
          isPrimary: true,
        },
      ],
      foreignKeys: [
        {
          columnNames: ['webeditor_users_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'webeditor_users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          columnNames: ['webeditor_roles_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'webeditor_roles',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('webeditor_users_has_webeditor_roles');
  }

}

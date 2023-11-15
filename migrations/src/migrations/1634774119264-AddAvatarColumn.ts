import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarColumn1634774119264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'webeditor_users',
        new TableColumn({
          name: 'avatar',
          type: 'varchar(100)',
          isNullable: true,
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('webeditor_users', 'avatar');
    }

}

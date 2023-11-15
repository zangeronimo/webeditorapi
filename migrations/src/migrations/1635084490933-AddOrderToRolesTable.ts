import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddOrderToRolesTable1635084490933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'webeditor_roles',
        new TableColumn({
          name: 'order',
          type: 'int',
          isNullable: true,
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('webeditor_roles', 'order');
    }

}

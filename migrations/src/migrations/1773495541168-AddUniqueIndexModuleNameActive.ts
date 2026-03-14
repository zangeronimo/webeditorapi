import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexModuleNameActive1773495541168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UX_module_name_active"
            ON webeditor_modules (name)
            WHERE deleted_at IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "UX_module_name_active";
        `);
    }

}

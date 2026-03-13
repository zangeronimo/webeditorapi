import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexUsersCompanyEmailActive1773431783742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UX_users_company_email"
            ON webeditor_users (webeditor_companies_id, email)
            WHERE deleted_at IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "UX_users_company_email";
        `);
    }

}

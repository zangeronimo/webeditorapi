import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateRecipeCategories1634407269332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'recipe_categories',
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
              name: 'name',
              type: 'varchar(45)',
              isNullable: false,
            },
            {
              name: 'recipe_levels_id',
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
              name: 'RecipeLevel',
              referencedTableName: 'recipe_levels',
              referencedColumnNames: ['id'],
              columnNames: ['recipe_levels_id'],
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
      await queryRunner.dropTable('recipe_categories');
    }

}

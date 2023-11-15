import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateRecipes1634407913542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'recipes',
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
              type: 'varchar(80)',
              isNullable: false,
            },
            {
              name: 'name',
              type: 'varchar(80)',
              isNullable: false,
            },
            {
              name: 'ingredients',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'preparation',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'recipe_categories_id',
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
              name: 'RecipeCategory',
              referencedTableName: 'recipe_categories',
              referencedColumnNames: ['id'],
              columnNames: ['recipe_categories_id'],
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
      await queryRunner.dropTable('recipes');
    }

}

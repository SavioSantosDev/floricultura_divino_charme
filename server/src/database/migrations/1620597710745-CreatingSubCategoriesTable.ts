import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatingSubCategoriesTable1620597710745
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sub_categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'unique_name',
            type: 'varchar',
            isUnique: true,
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
            name: 'category_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'sub_categories',
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  /* istanbul ignore next */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sub_categories');
  }
}

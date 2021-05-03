import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatingProductSubCategoriesTable1618523927834
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_sub_categories',
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
            name: 'image',
            type: 'varchar',
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
            name: 'product_category_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'product_sub_categories',
            columnNames: ['product_category_id'],
            referencedTableName: 'product_categories',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_sub_categories');
  }
}

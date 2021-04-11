import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatingProductCategoriesKeywordsTable1618060938871
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_categories_keywords',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'keyword',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'product_category_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'product_categories_keywords',
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
    await queryRunner.dropTable('product_categories_keywords');
  }
}

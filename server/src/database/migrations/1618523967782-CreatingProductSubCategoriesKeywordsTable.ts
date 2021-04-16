import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatingProductSubCategoriesKeywordsTable1618523967782
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_sub_categories_keywords',
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
            name: 'product_sub_category_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'product_sub_categories_keywords',
            columnNames: ['product_sub_category_id'],
            referencedTableName: 'product_sub_categories',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_sub_categories_keywords');
  }
}

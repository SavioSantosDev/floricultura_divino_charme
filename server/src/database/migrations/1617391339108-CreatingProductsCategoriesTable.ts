import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatingProductsCategoriesTable1617391339108
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_categories',
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
            length: '20',
          },
          {
            name: 'unique_name',
            type: 'varchar',
            length: '20',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_categories');
  }
}

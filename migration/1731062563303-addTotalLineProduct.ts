import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTotalLineProduct1731062563303 implements MigrationInterface {
  name = 'AddTotalLineProduct1731062563303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_on_product_entity\` ADD \`total_line_product\` decimal NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_on_product_entity\` DROP COLUMN \`total_line_product\``,
    );
  }
}

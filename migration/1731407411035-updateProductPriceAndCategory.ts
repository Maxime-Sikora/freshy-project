import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductPriceAndCategory1731407411035
  implements MigrationInterface
{
  name = 'UpdateProductPriceAndCategory1731407411035';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` DROP FOREIGN KEY \`FK_641188cadea80dfe98d4c769ebf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` DROP COLUMN \`price\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` ADD \`price\` decimal(3,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` ADD CONSTRAINT \`FK_641188cadea80dfe98d4c769ebf\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category_entity\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` DROP FOREIGN KEY \`FK_641188cadea80dfe98d4c769ebf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` DROP COLUMN \`price\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` ADD \`price\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` ADD CONSTRAINT \`FK_641188cadea80dfe98d4c769ebf\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

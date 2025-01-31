import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDecimalPrice1737383399927 implements MigrationInterface {
  name = 'UpdateDecimalPrice1737383399927';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` CHANGE \`price\` \`price\` decimal(5,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` CHANGE \`price\` \`price\` decimal(3,2) NOT NULL`,
    );
  }
}

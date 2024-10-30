import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkUserAndProduct1730284843083 implements MigrationInterface {
  name = 'LinkUserAndProduct1730284843083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` ADD \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` ADD CONSTRAINT \`FK_9b522961bc02b956d1699a23ae3\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` DROP FOREIGN KEY \`FK_9b522961bc02b956d1699a23ae3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` DROP COLUMN \`userId\``,
    );
  }
}

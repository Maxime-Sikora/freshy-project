import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueMailAndUpdatePrice1757430397225
  implements MigrationInterface
{
  name = 'UniqueMailAndUpdatePrice1757430397225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` ADD UNIQUE INDEX \`IDX_415c35b9b3b6fe45a3b065030f\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` DROP INDEX \`IDX_415c35b9b3b6fe45a3b065030f\``,
    );
  }
}

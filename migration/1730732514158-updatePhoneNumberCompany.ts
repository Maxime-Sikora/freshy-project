import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePhoneNumberCompany1730732514158
  implements MigrationInterface
{
  name = 'UpdatePhoneNumberCompany1730732514158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_entity\` DROP COLUMN \`phone_number_company\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_entity\` ADD \`phone_number_company\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_entity\` DROP COLUMN \`phone_number_company\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_entity\` ADD \`phone_number_company\` int NOT NULL`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompany1730729231932 implements MigrationInterface {
  name = 'AddCompany1730729231932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`company_name\` varchar(255) NOT NULL, \`street_company\` varchar(255) NOT NULL, \`zip_code_company\` int NOT NULL, \`city_company\` varchar(255) NOT NULL, \`phone_number_company\` int NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_85395fe5cf74020159bc2a7eaf\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_entity\` ADD CONSTRAINT \`FK_85395fe5cf74020159bc2a7eaf1\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_entity\` DROP FOREIGN KEY \`FK_85395fe5cf74020159bc2a7eaf1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_85395fe5cf74020159bc2a7eaf\` ON \`company_entity\``,
    );
    await queryRunner.query(`DROP TABLE \`company_entity\``);
  }
}

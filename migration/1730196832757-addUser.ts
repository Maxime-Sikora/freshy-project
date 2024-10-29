import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1730196832757 implements MigrationInterface {
  name = 'AddUser1730196832757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`role\` ENUM('admin', 'producer', 'customer') NOT NULL DEFAULT 'customer', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user_entity\``);
  }
}

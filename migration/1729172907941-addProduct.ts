import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProduct1729172907941 implements MigrationInterface {
  name = 'AddProduct1729172907941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productName\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`product_entity\``);
  }
}

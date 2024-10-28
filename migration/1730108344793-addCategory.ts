import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategory1730108344793 implements MigrationInterface {
  name = 'AddCategory1730108344793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` ADD \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` ADD CONSTRAINT \`FK_641188cadea80dfe98d4c769ebf\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` DROP FOREIGN KEY \`FK_641188cadea80dfe98d4c769ebf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_entity\` DROP COLUMN \`categoryId\``,
    );
    await queryRunner.query(`DROP TABLE \`category_entity\``);
  }
}

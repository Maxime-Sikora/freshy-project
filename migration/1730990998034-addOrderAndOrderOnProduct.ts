import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderAndOrderOnProduct1730990998034
  implements MigrationInterface
{
  name = 'AddOrderAndOrderOnProduct1730990998034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order_on_product_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`orderId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`total_price\` decimal NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_on_product_entity\` ADD CONSTRAINT \`FK_3ceadcb1b10ded4540ef18f164e\` FOREIGN KEY (\`orderId\`) REFERENCES \`order_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_on_product_entity\` ADD CONSTRAINT \`FK_0ccdfb41a60b850c300735415ae\` FOREIGN KEY (\`productId\`) REFERENCES \`product_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_entity\` ADD CONSTRAINT \`FK_c8ab590f1e10afcf1637e71a71e\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_entity\` DROP FOREIGN KEY \`FK_c8ab590f1e10afcf1637e71a71e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_on_product_entity\` DROP FOREIGN KEY \`FK_0ccdfb41a60b850c300735415ae\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_on_product_entity\` DROP FOREIGN KEY \`FK_3ceadcb1b10ded4540ef18f164e\``,
    );
    await queryRunner.query(`DROP TABLE \`order_entity\``);
    await queryRunner.query(`DROP TABLE \`order_on_product_entity\``);
  }
}

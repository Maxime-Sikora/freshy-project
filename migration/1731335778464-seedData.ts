import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDatabase1731061500000 implements MigrationInterface {
  name = 'seedData1731061500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO user_entity (id, email, password, \`firstName\`, \`lastName\`, role) VALUES
      (1, 'admin@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Admin', 'Utilisateur', 'admin'),
      (2, 'producteur1@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Jean', 'Dupont', 'producer'),
      (3, 'producteur2@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Marie', 'Martin', 'producer'),
      (4, 'producteur3@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Paul', 'Durand', 'producer'),
      (5, 'producteur4@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Sophie', 'Dubois', 'producer'),
      (6, 'producteur5@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Pierre', 'Moreau', 'producer'),
      (7, 'consommateur1@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Alice', 'Petit', 'customer'),
      (8, 'consommateur2@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Luc', 'Rousseau', 'customer'),
      (9, 'consommateur3@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Emma', 'Blanc', 'customer'),
      (10, 'consommateur4@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Hugo', 'Garcia', 'customer'),
      (11, 'consommateur5@exemple.com', '$2b$10$wWKL8/cavKnoEaAkTCiQ2.LfrMfS/UGLe150YBaai.NSoBpO.EHJe', 'Chloé', 'Fernandez', 'customer');
    `);

    await queryRunner.query(`
      INSERT INTO company_entity (id, company_name, street_company, zip_code_company, city_company, phone_number_company, userId) VALUES
      (1, 'Ferme de Jean', '10 rue des Champs', 75001, 'Paris', '0102030405', 2),
      (2, 'Domaine Marie', '5 avenue des Vignes', 69001, 'Lyon', '0203040506', 3),
      (3, 'Produits de Paul', '12 impasse des Jardins', 13001, 'Marseille', '0304050607', 4),
      (4, 'Exploitation Sophie', '7 boulevard des Moissons', 33000, 'Bordeaux', '0405060708', 5),
      (5, 'Les Récoltes de Pierre', '3 allée des Fermiers', 31000, 'Toulouse', '0506070809', 6);
    `);

    await queryRunner.query(`
      INSERT INTO category_entity (id, name) VALUES
      (1, 'Légumes'),
      (2, 'Fruits'),
      (3, 'Produits Laitiers'),
      (4, 'Boulangerie'),
      (5, 'Viande');
    `);

    await queryRunner.query(`
      INSERT INTO product_entity (id, \`productName\`, description, price, status, categoryId, userId) VALUES
      (1, 'Tomate', 'Tomates fraîches de saison', 2.5, 'active', 1, 2),
      (2, 'Pomme', 'Pommes juteuses et croquantes', 3.0, 'active', 2, 2),
      (3, 'Lait', 'Lait frais entier', 1.5, 'active', 3, 3),
      (4, 'Pain complet', 'Pain de campagne au levain', 2.0, 'active', 4, 4),
      (5, 'Poulet fermier', 'Poulet élevé en plein air', 8.0, 'active', 5, 5),
      (6, 'Pomme de terre', 'Pommes de terre bio', 1.2, 'active', 1, 6),
      (7, 'Banane', 'Bananes douces et mûres', 1.8, 'active', 2, 3),
      (8, 'Fromage', 'Fromage affiné artisanal', 5.0, 'active', 3, 4),
      (9, 'Croissant', 'Croissant au beurre', 2.5, 'active', 4, 5),
      (10, 'Porc bio', 'Viande de porc bio', 7.0, 'active', 5, 6);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM product_entity;`);
    await queryRunner.query(`DELETE FROM company_entity;`);
    await queryRunner.query(`DELETE FROM user_entity;`);
    await queryRunner.query(`DELETE FROM category_entity;`);
  }
}

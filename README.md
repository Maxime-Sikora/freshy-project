# Freshy

Freshy est un projet personnel, il s'agit d'une application destinée aux agriculteurs souhaitant vendre leurs produits directement aux consommateurs. Elle permet aux producteurs de s’inscrire et de gérer leurs produits, offrant une plateforme pour des achats en circuits courts et soutenant les producteurs locaux.

## Prérequis

    •	Docker : pour la création et la gestion de la base de données.
    •	Node.js et npm : pour installer les dépendances et exécuter le projet.

## Installation

1. Cloner le dépôt :

```bash
git clone <URL_DU_DÉPÔT>
cd freshy
```

2. Installer les dépendances :

Dans le répertoire du projet, exécute la commande suivante pour installer toutes les dépendances :

```bash
npm install
```

3. Configuration de la base de données avec Docker :

Assurez-vous d’avoir Docker et Docker Compose installés. Le projet utilise un fichier docker-compose.yml pour configurer la base de données. Dans ce fichier, la configuration de la base de données est déjà prête.
Pour lancer la base de données avec Docker, exécutez :

```bash
docker-compose up -d
```

Cette commande démarre les conteneurs nécessaires en arrière-plan.

## Gestion des Migrations

Des commandes spécifiques sont définies dans le fichier package.json pour faciliter la gestion des migrations de la base de données. Ajoutez les lignes suivantes à package.json pour utiliser les commandes de migration :

```json
"typeorm": "typeorm-ts-node-commonjs",
"migration:create": "./create-migration.sh",
"migration:generate": "./generate-migration.sh",
"migration:run": "./run-migration.sh",
"migration:revert": "./revert-migration.sh"
```

### Commandes de Migration

• Créer une migration :

```bash
npm run migration:create -- -n NomDeLaMigration
```

• Générer une migration :

```bash
npm run migration:generate -- -n NomDeLaMigration
```

• Exécuter les migrations :

```bash
npm run migration:run
```

• Revenir en arrière sur une migration :

```bash
npm run migration:revert
```

## Démarrage de l’application

Pour lancer l’application en mode développement et s’assurer que la base de données démarre automatiquement, ajoutez/modifiez la ligne start:dev dans package.json comme suit :

```json
"start:dev": "docker-compose up -d && nest start --watch"
```

Avant de démarrer le serveur, lancez les migrations pour créer les tables nécessaires dans la base de données :

```bash
npm run migration:run
```

Ensuite, lancez l’application avec la commande suivante :

```bash
npm run start:dev
```

## Description du Projet

Freshy est une application qui vise à permettre aux agriculteurs de vendre leurs produits en direct aux consommateurs, sans intermédiaires. Elle propose les fonctionnalités suivantes :
• Inscription des producteurs et des consommateurs.
• Gestion des produits par les producteurs.
• Affichage des produits disponibles pour les consommateurs.
• Création de commandes par les consommateurs pour acheter directement auprès des producteurs.

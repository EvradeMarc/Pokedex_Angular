# Application Pokédex Angular

Une application Angular robuste pour gérer une collection de Pokémon, intégrant l'authentification, le routage et une architecture à double source de données. Construite avec **Angular 20**.

## 🚀 Fonctionnalités

Ce projet démontre des modèles Angular avancés et une architecture propre :

*   **🔒 Système d'Authentification** : Accès sécurisé avec une page de connexion et un `AuthGuard` protégeant les routes administratives.
*   **📖 Gestion du Pokédex (CRUD)** :
    *   **Liste** : Parcourir tous les Pokémon disponibles avec des indicateurs visuels de type.
    *   **Détail** : Voir les statistiques détaillées (PV, Dégâts, Types) et la date de création.
    *   **Édition** : Modifier les détails des Pokémon existants via un formulaire réactif.
    *   **Ajout** : Enregistrer de nouveaux Pokémon dans le Pokédex.
*   **🎨 Interface Utilisateur Dynamique** :
    *   **Directives Personnalisées** : Couleurs de bordure dynamiques basées sur les types de Pokémon (`PokemonBorderDirective`).
    *   **Design Responsive** : Interface propre et accessible.
*   **⚙️ Architecture Avancée** :
    *   **Stratégie de Double Service de Données** : Implémente un modèle "Factory Provider" pour basculer de manière transparente entre `PokemonLocalStorageService` (Production) et `PokemonJSONServerService` (Développement).
    *   **Configuration par Environnement** : Configurations de build basées sur l'environnement.

## 🛠️ Stack Technique

*   **Framework** : Angular 20
*   **Langage** : TypeScript 5.8
*   **État/Asynchrone** : RxJS 7
*   **Style** : CSS Vanilla (Scope par composant)
*   **Tests** : Jasmine & Karma
*   **Mock Backend** : JSON Server (pour l'API de développement)

## 📦 Installation et Configuration

### Prérequis
*   Node.js (version LTS recommandée)
*   npm

### 1. Cloner le dépôt
```bash
git clone <url-du-depot>
cd Pokedex_Angular
```

### 2. Installer les dépendances
```bash
npm install
```

## ▶️ Lancer l'Application

### Mode Développement (avec API)
Pour exécuter l'application avec le backend JSON simulé, vous avez besoin de deux terminaux :

1.  **Démarrer le Serveur API** :
    ```bash
    npm run start:api
    ```
    *Démarre `json-server` sur le port 3000.*

2.  **Démarrer le Serveur de Développement Angular** :
    ```bash
    npm start
    ```
    *Ouvre l'application à l'adresse `http://localhost:4200`.*

### Build pour la Production
```bash
npm run build
```
Les artefacts de build seront stockés dans le dossier `dist/`.

## 📂 Structure du Projet

```
src/
├── app/
│   ├── core/           # Services singleton et guards (AuthGuard)
│   ├── login/          # Module de fonctionnalité de connexion
│   ├── pokemon/        # Module principal de fonctionnalité Pokémon
│   │   ├── pokemon-list/
│   │   ├── pokemon-profile/
│   │   ├── pokemon-edit/
│   │   └── pokemon-add/
│   ├── shared/         # Ressources partagées (si présentes)
│   └── app.config.ts   # Configuration de l'app et Providers DI
├── assets/             # Images et ressources statiques
└── environments/       # Configs d'environnement (prod/dev)
```

# Changelog - BookLibraryApp

Toutes les modifications notables du projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/).

---

## [Non publié] - En développement

### 🎯 Phase en cours : Core Features (Phase 2)

Prochains objectifs :
- Implémenter BookService (Google Books + OpenLibrary)
- Installer et configurer expo-sqlite
- Implémenter DatabaseService (CRUD livres)
- Créer l'écran de détail livre

---

## [1.0.0-dev] - 2025-12-04

### ✅ Ajouté

**Foundation & Setup**
- Configuration initiale Expo SDK 54.0.26
- Installation React Navigation 7 (Drawer + Stack)
- Configuration NativeWind 4.2.1 avec Tailwind CSS
- Configuration Metro avec support NativeWind
- Installation dépendances navigation (screens, safe-area, gesture-handler, reanimated)

**Écrans & Navigation**
- Écran d'accueil avec recherche textuelle et bouton scan
- Écran Bibliothèque avec grille FlatList + filtres
- Écran Profil avec auth Google/Apple (UI uniquement)
- Menu Drawer personnalisé avec statistiques
- Navigation Drawer + Stack avec headers personnalisés
- Bouton burger (gauche) et bouton profil (droite) dans headers

**EAS Build Configuration**
- Configuration `eas.json` avec 3 profils (development, preview, production)
- Configuration `app.json` avec bundle IDs et permissions
- Project ID EAS : `41b31d57-375b-4256-96ac-ddbe988a1e37`
- Configuration `appVersionSource: remote`
- Scripts npm pour builds (build:dev:ios, build:dev:android, build:dev:all)

**Documentation**
- CLAUDE.md - Documentation complète du projet
- EAS_BUILD_GUIDE.md - Guide EAS Build détaillé
- CHANGELOG.md - Fichier de suivi des changements

### 🔧 Modifié

**Configuration**
- `tailwind.config.js` : Ajout preset NativeWind
- `metro.config.js` : Intégration withNativeWind
- `index.js` : Import react-native-gesture-handler
- `App.js` : Import global.css

### ❌ Supprimé

**Packages natifs non configurés** (temporaire)
- `expo-barcode-scanner` - Causait erreur build iOS
- `@react-native-google-signin/google-signin` - Non configuré
- `@invertase/react-native-apple-authentication` - Non configuré

> Ces packages seront réinstallés avec leur configuration native lors de l'implémentation de leurs fonctionnalités.

### 🐛 Corrigé

**Problème 1 : Worklets Mismatch**
- **Erreur** : `Mismatch between JavaScript part and native part of Worklets (0.6.1 vs 0.5.1)`
- **Solution** : Utilisation d'un Development Build EAS au lieu d'Expo Go

**Problème 2 : NativeWind Configuration**
- **Erreur** : `Tailwind CSS has not been configured with the NativeWind preset`
- **Solution** : Ajout `presets: [require('nativewind/preset')]` dans tailwind.config.js

**Problème 3 : EAS Build iOS Failed**
- **Erreur** : `'ExpoModulesCore/EXBarcodeScannerInterface.h' file not found`
- **Solution** : Suppression des packages natifs non configurés

**Problème 4 : EAS CLI Warning**
- **Avertissement** : `The field "cli.appVersionSource" is not set`
- **Solution** : Ajout `"appVersionSource": "remote"` dans eas.json

### 📦 Dépendances Actuelles

**Navigation & UI**
- @react-navigation/native: ^7.1.24
- @react-navigation/drawer: ^7.7.8
- @react-navigation/native-stack: ^7.8.5
- react-native-screens: ~4.16.0
- react-native-safe-area-context: ~5.6.0
- react-native-gesture-handler: ~2.28.0
- react-native-reanimated: ~4.1.1

**Styling**
- nativewind: ^4.2.1
- tailwindcss: ^3.4.18

**Expo & Core**
- expo: ~54.0.26
- expo-dev-client: ~6.0.19
- expo-status-bar: ~3.0.8
- react: 19.1.0
- react-native: 0.81.5

**Utilitaires**
- axios: ^1.13.2
- @react-native-async-storage/async-storage: ^2.2.0

---

## [0.1.0] - 2025-12-03

### Initialisation

- Création du projet Expo avec `create-expo-app`
- Première structure de base
- Configuration Git

---

## Format des Versions

- **MAJOR.MINOR.PATCH** (1.0.0)
- **-dev** : Version en développement
- **-alpha** : Version alpha (tests internes)
- **-beta** : Version beta (tests publics)

## Types de Changements

- **✅ Ajouté** : Nouvelles fonctionnalités
- **🔧 Modifié** : Modifications de fonctionnalités existantes
- **🗑️ Déprécié** : Fonctionnalités bientôt supprimées
- **❌ Supprimé** : Fonctionnalités supprimées
- **🐛 Corrigé** : Corrections de bugs
- **🔒 Sécurité** : Corrections de vulnérabilités

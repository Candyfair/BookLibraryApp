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
- Créer l'écran ScanScreen avec expo-camera
- Créer l'écran de détail livre

---

## [1.0.0-dev.6] - 2025-12-17

### ✅ Ajouté

**UI/UX - Bottom Sheet pour Login et Profil**
- Migration complète de l'écran Profil vers une **BottomSheet** (@gorhom/bottom-sheet)
- Création de `ProfileBottomSheet` component (`src/components/ProfileBottomSheet.js`)
- Création de `ProfileBottomSheetContext` pour gestion globale de l'état (`src/contexts/ProfileBottomSheetContext.js`)
- Bottom sheet accessible depuis n'importe quel écran via l'icône profil du Header
- Ouverture directe à 92% de la hauteur d'écran (laisse visible le header avec icônes)
- Animation fluide à l'ouverture et à la fermeture

**Architecture & Configuration**
- Ajout de `BottomSheetModalProvider` dans `App.js` (requis par @gorhom/bottom-sheet)
- Ajout de `GestureHandlerRootView` pour supporter les gestures de la bottom sheet
- Context Provider pattern pour état global accessible depuis toute l'app

### 🔧 Modifié

**Header Component** (`src/components/Header.js`)
- Remplacement de `navigation.navigate('Profil')` par `openBottomSheet()`
- Intégration du hook `useProfileBottomSheet()` pour accès au Context
- L'icône profil ouvre maintenant la bottom sheet au lieu de naviguer vers ProfileStack

**App.js**
- Restructuration de la hiérarchie des Providers :
  ```
  GestureHandlerRootView
    └─ SafeAreaProvider
        └─ BottomSheetModalProvider
            └─ ProfileBottomSheetProvider
                ├─ RootNavigator
                └─ ProfileBottomSheet
  ```

**ProfileBottomSheet Component** (`src/components/ProfileBottomSheet.js`)
- Utilisation de `BottomSheetModal` au lieu de `BottomSheet` (meilleure performance)
- Utilisation de `BottomSheetScrollView` pour scrolling optimisé
- Optimisation avec `useMemo` pour snapPoints (évite re-création)
- Optimisation avec `useCallback` pour tous les handlers (évite re-renders)
- Backdrop personnalisé avec `BottomSheetBackdrop` (overlay semi-transparent)
- Configuration `pressBehavior="close"` (clic dehors ferme la sheet)
- Styles inline via StyleSheet au lieu de styles inline directs (performance)
- Séparation claire des responsabilités :
  - `closeBottomSheet()` : Démarre l'animation de fermeture
  - `onDismiss={handleDismiss}` : Met à jour l'état après l'animation

### 🎨 Optimisations Performance

**Gestion des animations**
- Prop `index={0}` pour ouverture directe au premier snapPoint (92%)
- Méthodes `present()` et `dismiss()` au lieu de `expand()` et `close()`
- Callback `onDismiss` séparé de `closeBottomSheet` pour éviter re-render pendant l'animation
- Configuration `enableDismissOnClose={true}` pour fermeture fluide
- Désactivation de `enableOverDrag` pour éviter glitches visuels

**Optimisations React**
- `useMemo(() => ['92%'], [])` pour snapPoints
- `useCallback` pour tous les handlers (renderBackdrop, handleLogin, handleLogout, etc.)
- Styles via StyleSheet.create() au lieu d'objets inline
- `showsVerticalScrollIndicator={false}` pour réduire les re-renders

### 📝 Architecture Technique

**ProfileBottomSheetContext API :**
```javascript
const {
  bottomSheetRef,        // Ref vers la BottomSheetModal
  isOpen,                // État d'ouverture (boolean)
  openBottomSheet,       // Ouvre la bottom sheet
  closeBottomSheet,      // Ferme la bottom sheet
  handleDismiss,         // Callback après fermeture (onDismiss)
} = useProfileBottomSheet();
```

**Workflow d'ouverture/fermeture :**
1. Clic sur icône profil → `openBottomSheet()`
2. `present()` appelé → Animation d'ouverture démarre
3. Bottom sheet s'ouvre à `index={0}` (snapPoint 92%)
4. Clic dehors ou swipe down → `closeBottomSheet()`
5. `dismiss()` appelé → Animation de fermeture démarre
6. Animation terminée → `onDismiss` callback → `handleDismiss()` → `setIsOpen(false)`

**BottomSheetModal vs BottomSheet :**
- `BottomSheet` : Monté dès le départ, toujours présent dans le DOM
- `BottomSheetModal` : Monté uniquement à l'ouverture (⚡ meilleure performance)
- Méthodes différentes : `present()/dismiss()` vs `expand()/close()`

### 🐛 Corrections

**Animations saccadées à l'ouverture**
- ❌ Problème : Contenu visible avant l'animation
- ✅ Solution : Migration vers `BottomSheetModal` (contenu monté uniquement à l'ouverture)

**Animations saccadées à la fermeture**
- ❌ Problème : `onDismiss={closeBottomSheet}` causait un re-render pendant l'animation
- ✅ Solution : Séparation `closeBottomSheet()` (animation) et `handleDismiss()` (état)

**Backdrop clignotant**
- ❌ Problème : `renderBackdrop` recréé à chaque render
- ✅ Solution : Encapsulation dans `useCallback` avec dependencies array vide

**Ouverture à mi-hauteur au lieu de 92%**
- ❌ Problème : Pas d'index spécifié, ouverture par défaut
- ✅ Solution : Ajout de la prop `index={0}` sur BottomSheetModal

### 📦 Configuration

**SnapPoints :**
- `['92%']` : Plein écran avec header visible (icônes burger + profil)
- Ajustable via modification du pourcentage dans `ProfileBottomSheet.js:31`

**Backdrop :**
- Opacité : 0.5
- Couleur : Noir semi-transparent
- Comportement : Clic dehors ferme la bottom sheet

**Indicateur de poignée :**
- Couleur : `#94a3b8` (gris ardoise)
- Largeur : 40px
- Position : Centré en haut de la bottom sheet

### 🔄 Impact sur ProfileScreen.js

**État actuel :**
- ProfileScreen.js existe toujours mais n'est plus accessible via navigation
- ProfileStack reste dans le DrawerNavigator mais est masqué (`drawerItemStyle: { display: 'none' }`)
- Tout le contenu de ProfileScreen a été réutilisé dans ProfileBottomSheet

**Prochaines étapes (optionnel) :**
- Possibilité de supprimer ProfileStack du DrawerNavigator
- Possibilité de supprimer ProfileScreen.js (logique migrée dans BottomSheet)

### 🧪 Tests Effectués

- ✅ Ouverture de la bottom sheet depuis HomeScreen
- ✅ Ouverture de la bottom sheet depuis LibraryScreen
- ✅ Ouverture de la bottom sheet depuis StatScreen
- ✅ Fermeture par swipe down
- ✅ Fermeture par clic sur backdrop
- ✅ Fermeture par bouton close (icône X)
- ✅ Animation fluide à l'ouverture (92% sans saccades)
- ✅ Animation fluide à la fermeture (contenu disparaît avec la sheet)
- ✅ Pas de clignotement du backdrop
- ✅ Pas de contenu visible avant l'animation

---

## [1.0.0-dev.5] - 2025-12-11

### ✅ Ajouté

**Navigation - Sous-menus de Filtres dans le Drawer**
- Ajout de 4 sous-menus de filtres entre "Voir mes livres" et "Statistiques" :
  - ⭐ **Favoris** : Filtre `favorite` (indenté)
  - 📤 **Prêtés** : Filtre `lent` (indenté)
  - 📥 **Empruntés** : Filtre `borrowed` (indenté)
  - 🎁 **Ma wishlist** : Filtre `wishlist` (non indenté, au même niveau que les items principaux)
- Navigation vers LibraryScreen avec paramètre `filter` correspondant
- Composant `SubMenuItem` réutilisable avec prop `indented={true|false}`

### 🔧 Modifié

**CustomDrawerContent** (`src/components/CustomDrawerContent.js`)
- Refactorisation complète : remplacement de `<DrawerItemList />` par rendu manuel des items
- Mapping sur `state.routes` pour contrôler l'ordre et insérer les sous-menus
- Extraction de `drawerIcon` depuis `descriptors[route.key].options`
- Ajout de la prop `focused` aux `DrawerItem` pour coloration de l'item actif
- Composant `SubMenuItem` avec gestion conditionnelle de l'indentation via classe `pl-12`
- Labels hardcodés en français pour cohérence avec le reste de l'UI

**DrawerNavigator** (`src/navigation/DrawerNavigator.js`)
- Renommage des `name` des Drawer.Screen pour conventions en anglais :
  - "Scanner un livre" → `AddBook`
  - "Voir mes livres" → `Library`
  - "Statistiques" → `Statistics`
  - "Profil" → `Profil` (inchangé)
- Les labels affichés restent en français (gérés dans CustomDrawerContent)

### 📝 Notes Techniques

**Architecture Drawer mise à jour :**
```
CustomDrawerContent
  ├─ Scanner un livre (AddBook)
  ├─ Voir mes livres (Library)
  │   ├─ Favoris (indenté)
  │   ├─ Prêtés (indenté)
  │   ├─ Empruntés (indenté)
  │   └─ Ma wishlist (non indenté) → NOUVEAU
  └─ Statistiques (Statistics)
```

**Système de navigation avec filtres :**
- Clic sur un sous-menu : `navigation.navigate('Library', { filter: 'favorite' })`
- LibraryScreen recevra le paramètre via `route.params?.filter`
- Implémentation du filtrage côté LibraryScreen à venir (Phase 2)

**Composant SubMenuItem :**
```javascript
<SubMenuItem
  label="Favoris"
  filter="favorite"
  icon="star"
  indented={true}  // Optionnel, true par défaut
/>
```

---

## [1.0.0-dev.4] - 2025-12-09

### ✅ Ajouté

**Navigation**
- Création du StatStack dans `src/navigation/StatStack.js`
- Ajout de l'écran Statistiques dans le DrawerNavigator
- Nouvelle entrée "Statistiques" visible dans le menu Drawer avec icône `stats-chart`

**Écrans**
- Création de `src/screens/StatScreen.js` (placeholder temporaire)
  - Header réutilisable intégré
  - SafeAreaView pour gestion des zones sûres
  - Message "(à implémenter)" en attente de la logique de calcul des stats

### 🔧 Modifié

**CustomDrawerContent** (`src/components/CustomDrawerContent.js`)
- Suppression des statistiques dans le header du drawer
- Simplification du contenu : titre + navigation + version uniquement
- Suppression de la section "Liens rapides" (Stats, Paramètres, Aide)
- Les statistiques sont désormais accessibles via l'écran dédié dans le drawer

**DrawerNavigator** (`src/navigation/DrawerNavigator.js`)
- Renommage des entrées du drawer pour plus de clarté :
  - "Accueil" → "Scanner un livre" (icône `barcode-outline`)
  - "Bibliothèque" → "Voir mes livres" (icône `library-outline`)
- Ajout de l'entrée "Statistiques" (icône `stats-chart`)
- Profil reste masqué (`drawerItemStyle: { display: 'none' }`)

### ❌ Supprimé

**CustomDrawerContent**
- Section statistiques en un coup d'œil (Total livres, Lus, Wishlist)
- Section "Liens rapides" avec boutons Statistiques, Paramètres, Aide
- Tous les composants Pressable et imports Ionicons associés
- Spacer central (simplifié en un seul spacer)

### 📝 Notes Techniques

**Architecture navigation mise à jour :**
```
DrawerNavigator
  ├─ Scanner un livre (HomeStack)
  ├─ Voir mes livres (LibraryStack)
  ├─ Statistiques (StatStack) → NOUVEAU
  └─ Profil (ProfileStack) - masqué
```

**Drawer simplifié :**
- Header : Titre uniquement
- Navigation : Liste automatique des écrans visibles
- Footer : Version + informations produit

---

## [1.0.0-dev.3] - 2025-12-08

### 🔧 Modifié

**Refonte UI - HomeScreen**
- Repositionnement des éléments conformément à la maquette
- Boutons "Rechercher" et "Scanner un livre" centrés verticalement dans l'écran
- Suppression des sections "Derniers ajouts" et "Accès rapide" (prévues pour implémentation ultérieure)
- Layout simplifié pour mettre l'accent sur l'action principale (scan/recherche)
- Container principal avec `flex: 1` et `justifyContent: 'center'` pour centrage vertical parfait

**Refonte UI - LibraryScreen**
- Suppression de l'état vide redondant (déjà géré par `ListEmptyComponent` de FlatList)
- Bouton flottant "+" repositionné : `bottom: 90` au lieu de `80` pour éviter chevauchement avec la navigation
- Code nettoyé : suppression des éléments commentés et des imports inutiles

### ❌ Supprimé

**HomeScreen**
- Section "Derniers ajouts" (liste horizontale de 3 livres fictifs)
- Section "Accès rapide" (raccourcis vers Bibliothèque et Statistiques)
- Import `Ionicons` non utilisé après suppression des sections

**LibraryScreen**
- État vide personnalisé redondant (conservé uniquement le `ListEmptyComponent`)
- Import `Ionicons` non utilisé
- Code commenté obsolète

### 📝 Documentation

- Mise à jour CLAUDE.md avec les changements UI du 8 décembre
- Mise à jour CHANGELOG.md avec la version 1.0.0-dev.3

---

## [1.0.0-dev.2] - 2025-12-07

### ✅ Ajouté

**Composants Réutilisables**
- Création du composant `<Header />` dans `src/components/Header.js`
  - Bouton burger : ouvre/ferme le Drawer via `navigation.toggleDrawer()`
  - Bouton profil : navigue vers ProfileStack via `navigation.navigate('Profil')`
  - Prop `showProfileButton={false}` pour masquer le bouton profil (utilisé sur ProfileScreen)
  - Utilise NativeWind (classes Tailwind) pour le styling

**Architecture Navigation**
- Suppression des headers natifs dans tous les Stacks (`headerShown: false`)
- Intégration du composant `<Header />` dans tous les écrans (HomeScreen, LibraryScreen, ProfileScreen)
- Utilisation de `useNavigation()` de `@react-navigation/native` dans Header

### 🔧 Modifié

**Configuration Babel** (babel.config.js)
- Configuration complète pour NativeWind v4 :
  ```javascript
  presets: [
    ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    'nativewind/babel',
  ]
  ```
- Plugin `react-native-reanimated/plugin` maintenu en dernier

**Fichiers Navigation**
- `src/navigation/HomeStack.js` : `headerShown: false`
- `src/navigation/LibraryStack.js` : `headerShown: false`
- `src/navigation/ProfileStack.js` : `headerShown: false`
- Suppression des fonctions `getScreenOptions` inutilisées

**Fichiers Écrans**
- `src/screens/HomeScreen.js` : Import et utilisation de `<Header />`
- `src/screens/LibraryScreen.js` : Import et utilisation de `<Header />`
- `src/screens/ProfileScreen.js` : Import et utilisation de `<Header showProfileButton={false} />`

### 🐛 Corrigé

**Problème 5 : NativeWind v4 ne fonctionnait pas**
- **Symptôme** : Classes Tailwind non compilées, styles non appliqués
- **Cause** : Configuration Babel incomplète pour NativeWind v4
- **Solution** :
  - Ajout de `jsxImportSource: 'nativewind'` dans babel-preset-expo
  - Ajout du preset `nativewind/babel`
  - Redémarrage Metro avec `--clear` pour régénérer le cache
- **Résultat** : ✅ NativeWind v4 pleinement fonctionnel

**Problème 6 : Icônes Header empilées verticalement**
- **Symptôme** : Boutons burger et profil affichés l'un au-dessus de l'autre au lieu d'horizontalement
- **Cause** : Classe `flex-row` seule insuffisante dans certains contextes
- **Solution** : Ajout de `flex` + `flex-row` ensemble
- **Alternative appliquée** : Utilisation de NativeWind après correction configuration Babel

### 📝 Documentation

- Mise à jour CLAUDE.md avec :
  - Section "Refactorisation navigation" dans Accomplissements Récents
  - Configuration Babel complète documentée
  - Ajout du composant Header dans la structure du projet
  - Note sur NativeWind v4 fonctionnel

---

## [1.0.0-dev.1] - 2025-12-05 à 2025-12-06

### ✅ Ajouté

**Restructuration Architecture**
- Création du dossier `src/` pour tout le code source
- Création du dossier `src/navigation/` avec fichiers séparés :
  - `RootNavigator.js` : NavigationContainer principal
  - `DrawerNavigator.js` : Configuration Drawer avec écrans
  - `HomeStack.js` : Stack pour l'écran Accueil avec headers personnalisés
  - `LibraryStack.js` : Stack pour la Bibliothèque avec headers personnalisés
  - `ProfileStack.js` : Stack pour le Profil avec header burger uniquement
- Migration de expo-barcode-scanner vers expo-camera (Expo SDK 54 compatible)
- Réinstallation packages natifs :
  - `expo-camera`
  - `@react-native-google-signin/google-signin`
  - `@invertase/react-native-apple-authentication`

**Navigation**
- Headers personnalisés dans chaque Stack :
  - Bouton burger (gauche) : ouvre/ferme le Drawer
  - Bouton profil (droite) : navigue vers ProfileStack (sauf ProfileStack)
- Écran Profil masqué du Drawer via `drawerItemStyle: { display: 'none' }`
- Accessible uniquement via icône profil dans les headers

### 🔧 Modifié

**Organisation Fichiers**
- Tous les fichiers en anglais (noms de fichiers + fonctions)
- Textes utilisateur conservés en français
- Déplacement écrans dans `src/screens/`
- Déplacement composants dans `src/components/`

**Navigation**
- Remplacement de `<TouchableOpacity>` par `<Pressable>` dans tous les fichiers de navigation
- Configuration Drawer avec statistiques en header
- ProfileStack avec header burger uniquement (pas de bouton profil)

**Configuration**
- `tailwind.config.js` : Content paths mis à jour vers `./src/**/*.{js,jsx,ts,tsx}`
- `.eslintrc.js` : Ajout de `requireConfigFile: false` pour compatibilité Babel

### ❌ Supprimé

**Fichiers Conflictuels**
- Suppression dossier `app/` contenant des fichiers Expo Router non utilisés
- Suppression fichier `Drawer.js` à la racine (remplacé par architecture modulaire)

**Packages Temporairement Retirés** (pour corriger builds)
- `expo-barcode-scanner` : Incompatible Expo SDK 54, remplacé par expo-camera

### 🐛 Corrigé

**Problème 3 (suite) : Migration expo-barcode-scanner**
- **Phase 1** : Suppression temporaire pour corriger build iOS
- **Phase 2** : Réinstallation → échec build Android (incompatibilité SDK 54)
- **Phase 3** : Migration vers `expo-camera` avec support `barCodeScannerSettings`
- **Résultat** : ✅ Compatible Expo SDK 54, build Android Development fonctionnel

**Problème 4 (résolu complètement)**
- Tests réussis sur appareil Android physique avec Development Build
- expo-camera installé et prêt à l'emploi

### 📝 Documentation

- Mise à jour CLAUDE.md avec architecture complète
- Documentation migration expo-barcode-scanner → expo-camera
- Ajout section "Structure du Projet" avec arborescence détaillée

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

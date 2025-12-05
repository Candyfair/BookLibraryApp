# Guide EAS Development Build

Ce guide explique comment créer et utiliser un Development Build pour BookLibraryApp.

## Pourquoi un Development Build ?

Expo Go ne supporte pas toutes les dépendances natives requises par ce projet :
- `react-native-reanimated` 4.x (utilisé par React Navigation Drawer)
- `expo-barcode-scanner` (scanner ISBN)
- `expo-sqlite` (base de données locale)

## Prérequis

1. **Compte Expo** : Créer un compte gratuit sur [expo.dev](https://expo.dev)
2. **EAS CLI installé** : ✅ Déjà installé globalement

## Étapes pour créer un Development Build

### 1. Se connecter à Expo

```bash
eas login
```

Entrez vos identifiants Expo.

### 2. Configurer le projet EAS

```bash
eas build:configure
```

Cette commande va :
- Générer un `projectId` unique
- Mettre à jour `app.json` avec ce projectId

### 3. Choisir la plateforme de build

#### Option A : Build iOS (Simulator - Mac uniquement)

```bash
eas build --profile development --platform ios
```

Une fois le build terminé :
- Télécharge le fichier `.tar.gz`
- Décompresse-le
- Glisse le fichier `.app` dans le simulateur iOS

#### Option B : Build Android (APK)

```bash
eas build --profile development --platform android
```

Une fois le build terminé :
- Télécharge l'APK sur ton téléphone Android
- Installe-le (active "Sources inconnues" si nécessaire)

#### Option C : Build les deux plateformes

```bash
eas build --profile development --platform all
```

### 4. Installer Expo Dev Client

Si ce n'est pas déjà fait, installe la dépendance :

```bash
npx expo install expo-dev-client
```

### 5. Lancer le serveur de développement

```bash
npx expo start --dev-client
```

### 6. Scanner le QR code

- Ouvre l'app de Development Build sur ton téléphone
- Scanne le QR code affiché dans le terminal
- L'app se chargera avec toutes les dépendances natives !

## Profils de build disponibles

Dans `eas.json`, 3 profils sont configurés :

### `development`
- **Usage** : Développement quotidien
- **Caractéristiques** :
  - Inclut Expo Dev Client
  - Rechargement à chaud (Fast Refresh)
  - Debugging activé
  - iOS : Build pour simulateur
  - Android : APK (pas AAB)

### `preview`
- **Usage** : Tests internes avant production
- **Caractéristiques** :
  - Pas de Dev Client
  - Version optimisée
  - Distribution interne uniquement

### `production`
- **Usage** : Publication sur App Store / Google Play
- **Caractéristiques** :
  - Version finale optimisée
  - Code minifié et obfusqué

## Commandes utiles

```bash
# Voir l'état de vos builds
eas build:list

# Annuler un build en cours
eas build:cancel

# Vérifier la configuration
eas build:inspect

# Télécharger un build
eas build:download
```

## Identifiants du projet

- **Bundle ID iOS** : `com.candice.booklibraryapp`
- **Package Android** : `com.candice.booklibraryapp`
- **Slug Expo** : `BookLibraryApp`

## Permissions configurées

### Android
- `CAMERA` : Pour scanner les codes-barres ISBN
- `READ_EXTERNAL_STORAGE` : Pour accéder aux images de livres
- `WRITE_EXTERNAL_STORAGE` : Pour sauvegarder les données

### iOS
Les permissions seront demandées automatiquement au runtime via les plugins Expo.

## Debugging

Si le build échoue :

1. Vérifier les logs dans le terminal
2. Consulter les builds sur [expo.dev/accounts/YOUR_ACCOUNT/projects](https://expo.dev)
3. Vérifier que toutes les dépendances sont compatibles :
   ```bash
   npx expo-doctor
   ```

## Coût

- **Builds gratuits** : Limité (vérifier sur expo.dev)
- **Plan Hobby** : Builds illimités pour $29/mois
- **Alternative** : Build local avec `eas build --local` (nécessite Xcode/Android Studio)

## Prochaines étapes

Une fois le Development Build installé :

1. ✅ Tester la navigation Drawer
2. ✅ Implémenter le scanner ISBN
3. ✅ Configurer SQLite
4. ✅ Intégrer les APIs (Google Books + OpenLibrary)
5. ✅ Tester l'authentification Google/Apple

Bonne chance ! 🚀

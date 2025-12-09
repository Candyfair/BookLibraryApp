# 📚 BookLibraryApp - Documentation Projet

> **Application mobile de gestion de bibliothèque personnelle**
> Développée avec Expo (React Native) - MVP en cours de développement

---

## 🆕 Dernières Mises à Jour (Décembre 2025)

### ✅ Phase 1 Foundation - Complétée

**Architecture & Navigation**

- ✅ Architecture modulaire avec `src/navigation/` (RootNavigator, DrawerNavigator, Stacks séparés)
- ✅ Composant `<Header />` réutilisable avec navigation Drawer et Profil
- ✅ Écran Profil masqué du Drawer (accessible uniquement via icône header)
- ✅ **Nouveau (9 déc)** : Écran Statistiques ajouté au Drawer (placeholder prêt pour implémentation)

**Configuration Technique**

- ✅ EAS Build configuré - Project ID: `41b31d57-375b-4256-96ac-ddbe988a1e37`
- ✅ NativeWind v4 fonctionnel (Babel + Metro configurés)
- ✅ Development Build testé avec succès sur Android physique
- ✅ Migration expo-barcode-scanner → expo-camera (compatibilité Expo SDK 54)

**UI & Écrans**

- ✅ HomeScreen, LibraryScreen, ProfileScreen, StatScreen implémentés
- ✅ Menu Drawer simplifié : "Scanner un livre", "Voir mes livres", "Statistiques"

> 📋 Pour l'historique détaillé des changements, voir [CHANGELOG.md](CHANGELOG.md)

### 📦 Packages Actuellement Installés

**Navigation & UI :**

- `@react-navigation/native`, `@react-navigation/drawer`, `@react-navigation/native-stack`
- `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`
- `nativewind`, `tailwindcss`

**Expo & Outils :**

- `expo` (SDK 54.0.26), `expo-dev-client`, `expo-status-bar`
- `axios`, `@react-native-async-storage/async-storage`

**Packages Natifs (Installés mais non configurés) :**

- ✅ `expo-camera` - Caméra et scanner de codes-barres (compatible Expo 54, remplace expo-barcode-scanner)
- ✅ `@react-native-google-signin/google-signin` - Auth Google (config requise)
- ✅ `@invertase/react-native-apple-authentication` - Auth Apple (config requise)

**À Installer :**

- `expo-sqlite` - Base de données locale

> **Note :** Les packages natifs sont installés mais nécessitent une configuration supplémentaire dans `app.json` et des credentials (Google OAuth, Apple Developer) avant utilisation.

### 🎯 Prochaines Étapes

1. 🔧 Tester le scanner de code-barres avec expo-camera sur Android
2. 💾 Installer et configurer expo-sqlite
3. 🗄️ Implémenter DatabaseService (CRUD livres)
4. 📚 Implémenter BookService (Google Books + OpenLibrary)
5. 🎨 Créer l'écran ScanScreen avec expo-camera

---

## 🎯 Vision du Projet

Une application mobile permettant de **scanner des livres via ISBN**, récupérer leurs données depuis des APIs publiques, les organiser en bibliothèque personnelle, et suivre ses lectures avec des statistiques.

### Objectifs MVP

- ✅ Scanner de codes-barres ISBN
- ✅ Recherche textuelle de livres
- ✅ Stockage local avec SQLite
- ✅ Organisation par genres, statuts (lu, à lire, wishlist)
- ✅ Gestion prêts/emprunts
- ✅ Statistiques de lecture basiques
- ✅ Authentification Google & Apple (optionnelle)
- ❌ Pas de synchronisation cloud pour le MVP

---

## 🏗️ Architecture Technique

### Stack Principale

| Technologie      | Version | Usage                          |
| ---------------- | ------- | ------------------------------ |
| **Expo SDK**     | 54.0.26 | Framework React Native managé  |
| **React Native** | 0.81.5  | Framework mobile               |
| **React**        | 19.1.0  | Librairie UI                   |
| **JavaScript**   | ES6+    | Langage principal              |
| **NativeWind**   | 4.2.1   | Styling (Tailwind CSS pour RN) |

### Navigation

| Package                          | Version | Usage                      |
| -------------------------------- | ------- | -------------------------- |
| `@react-navigation/native`       | 7.1.24  | Core navigation            |
| `@react-navigation/drawer`       | 7.7.8   | Menu latéral               |
| `@react-navigation/native-stack` | 7.8.5   | Navigation en stack        |
| `react-native-screens`           | 4.16.0  | Optimisation écrans natifs |
| `react-native-safe-area-context` | 5.6.0   | Safe areas (notch, etc.)   |
| `react-native-gesture-handler`   | 2.28.0  | Gestion gestures natives   |
| `react-native-reanimated`        | 4.1.1   | Animations performantes    |

> **Note :** Le projet utilise **React Navigation** (Drawer + Stack) et **non Expo Router**. Un dossier `app/` contenant des fichiers avec Expo Router a été supprimé pour éviter toute confusion.

### APIs & Services

| API                  | Usage                                                                            | Fallback          |
| -------------------- | -------------------------------------------------------------------------------- | ----------------- |
| **Google Books API** | Récupération données livres (titre, auteur, couverture, ISBN, description, etc.) | OpenLibrary       |
| **OpenLibrary API**  | API de secours si Google Books ne trouve rien                                    | Création manuelle |

### Stockage & Données

| Package                                     | Usage                                           | Statut         |
| ------------------------------------------- | ----------------------------------------------- | -------------- |
| `expo-sqlite`                               | Base de données locale (livres, notes, statuts) | ⏳ À installer |
| `@react-native-async-storage/async-storage` | Préférences utilisateur, cache temporaire       | ✅ Installé    |

### Fonctionnalités Natives

| Package                                        | Usage                                                             | Statut                                       |
| ---------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------- |
| `expo-dev-client`                              | Development Build (remplace Expo Go)                              | ✅ Installé                                  |
| `expo-camera`                                  | Caméra et scanner de codes-barres (remplace expo-barcode-scanner) | ✅ Installé - Plugin auto-configuré          |
| `@react-native-google-signin/google-signin`    | Sign in avec Google                                               | ✅ Installé - Configuration manuelle requise |
| `@invertase/react-native-apple-authentication` | Sign in avec Apple                                                | ✅ Installé - Configuration manuelle requise |
| `axios`                                        | Requêtes HTTP vers APIs                                           | ✅ Installé                                  |

### À Installer Plus Tard

| Package       | Usage                  | Raison                                                     |
| ------------- | ---------------------- | ---------------------------------------------------------- |
| `expo-sqlite` | Base de données locale | ⏳ À installer lors de l'implémentation du DatabaseService |

> **Note :** Les packages natifs d'authentification nécessitent une configuration supplémentaire :
>
> - **Google Sign-In** : Nécessite OAuth Client ID (Google Cloud Console) + configuration dans `app.json`
> - **Apple Sign-In** : Nécessite Apple Developer Account + Service ID + configuration dans `app.json`
> - **expo-camera** : Plugin déjà ajouté automatiquement par `npx expo install`, supporte la détection de codes-barres via `barCodeScannerSettings`

---

## 📁 Structure du Projet

```
BookLibraryApp/
├── App.js                          # Point d'entrée (SafeAreaProvider + RootNavigator)
├── index.js                        # Enregistrement app Expo
├── app.json                        # Config Expo (bundleId, permissions, etc.)
├── eas.json                        # Config EAS Build (dev, preview, prod)
├── package.json                    # Dépendances & scripts npm
├── metro.config.js                 # Config Metro + NativeWind
├── tailwind.config.js              # Config Tailwind CSS
├── global.css                      # Styles Tailwind de base
│
├── src/                            # Code source principal
│   ├── navigation/                 # Configuration navigation
│   │   ├── RootNavigator.js        # NavigationContainer + DrawerNavigator
│   │   ├── DrawerNavigator.js      # Drawer (Scanner + Library + Stats visible, Profil masqué)
│   │   ├── HomeStack.js            # Stack Accueil (headerShown: false)
│   │   ├── LibraryStack.js         # Stack Bibliothèque (headerShown: false)
│   │   ├── StatStack.js            # Stack Statistiques (headerShown: false)
│   │   └── ProfileStack.js         # Stack Profil (headerShown: false)
│   │
│   ├── screens/                    # Écrans de l'application
│   │   ├── HomeScreen.js           # Écran d'accueil (recherche + scan)
│   │   ├── LibraryScreen.js        # Grille de livres + filtres
│   │   ├── StatScreen.js           # Statistiques (placeholder)
│   │   └── ProfileScreen.js        # Profil utilisateur + auth
│   │
│   ├── components/                 # Composants réutilisables
│   │   ├── Header.js               # Header réutilisable (burger + profil)
│   │   └── CustomDrawerContent.js # Menu drawer simplifié
│   │
│   ├── services/                   # (À créer) Logique métier
│   │   ├── BookService.js          # API Google Books + OpenLibrary
│   │   ├── DatabaseService.js      # SQLite (CRUD livres)
│   │   ├── AuthService.js          # Authentification Google/Apple
│   │   └── StatsService.js         # Calcul statistiques
│   │
│   ├── utils/                      # (À créer) Utilitaires
│   │   ├── api.js                  # Config Axios, intercepteurs
│   │   ├── normalizer.js           # Normalisation données APIs
│   │   └── validators.js           # Validation ISBN, etc.
│   │
│   └── constants/                  # (À créer) Constantes
│       ├── colors.js               # Palette couleurs
│       ├── genres.js               # Liste genres prédéfinis
│       └── statuses.js             # Statuts livres (lu, wishlist, etc.)
│
├── assets/                         # Images, icônes, fonts
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
│
├── EAS_BUILD_GUIDE.md             # Guide complet EAS Build
└── CLAUDE.md                       # Ce fichier
```

> **Changements récents :**
>
> - ✅ **Architecture navigation modulaire** : Fichiers séparés dans `src/navigation/`
> - ✅ **Composant Header réutilisable** : `<Header />` dans `src/components/Header.js`
>   - Utilise NativeWind (classes Tailwind)
>   - Bouton burger : `navigation.toggleDrawer()` (ouvre/ferme le Drawer)
>   - Bouton profil : `navigation.navigate('Profil')` (navigue vers ProfileStack)
>   - Prop `showProfileButton={false}` pour masquer le bouton profil (ProfileScreen)
> - ✅ **Headers natifs supprimés** : `headerShown: false` dans tous les Stacks
> - ✅ **Profil masqué du Drawer** : `drawerItemStyle: { display: 'none' }` (accessible via icône)
> - ✅ **Composants Pressable** : Remplacement de TouchableOpacity partout
> - ✅ **Nouveau (9 déc)** : StatStack ajouté avec StatScreen (placeholder)
> - ✅ **Nouveau (9 déc)** : Drawer simplifié (titre + navigation + version)
> - ✅ **Nouveau (9 déc)** : Renommage entrées Drawer ("Scanner un livre", "Voir mes livres", "Statistiques")
> - ✅ Noms de fichiers et fonctions en anglais
> - ✅ Textes utilisateur en français

---

## 🎨 Design System (NativeWind/Tailwind)

### Palette de Couleurs

| Couleur           | Classe Tailwind           | Usage                            |
| ----------------- | ------------------------- | -------------------------------- |
| **Bleu primaire** | `bg-blue-500` `#3b82f6`   | Boutons principaux, liens actifs |
| **Indigo**        | `bg-indigo-500` `#6366f1` | Bouton scanner, accents          |
| **Gris sombre**   | `bg-gray-800` `#1e293b`   | Headers, texte principal         |
| **Gris clair**    | `bg-gray-50` `#f8fafc`    | Backgrounds, drawer              |
| **Vert**          | `bg-green-500` `#22c55e`  | Statut "lu", succès              |
| **Rouge**         | `bg-red-500` `#ef4444`    | Wishlist, favoris, erreurs       |

### Composants Standards

- **Boutons** : `rounded-lg py-3.5 px-6` avec `activeOpacity={0.8}`
- **Cartes** : `bg-white rounded-lg shadow-sm p-4`
- **Headers** : `bg-gray-800 text-white font-bold text-xl`
- **Textes principaux** : `text-gray-800 font-semibold`
- **Textes secondaires** : `text-gray-500 text-sm`

---

## 🚀 Scripts NPM Disponibles

### Développement Local

```bash
npm start              # Expo Go (limité, problème Worklets)
npm run start:dev      # Development Build (recommandé)
npm run android        # Ouvre sur Android
npm run ios            # Ouvre sur iOS
npm run web            # Version web (limitée)
```

### EAS Build (Cloud)

```bash
npm run build:dev:android    # Build Android development (APK)
npm run build:dev:ios        # Build iOS development (Simulator)
npm run build:dev:all        # Build les deux plateformes
```

### Commandes EAS Utiles

```bash
eas login                    # Se connecter à Expo
eas build:configure          # Configurer EAS (✅ déjà fait)
eas build:list               # Voir l'historique des builds
eas build:download           # Télécharger un build
eas build:cancel             # Annuler un build en cours
```

> **⚠️ Important :** Avant de lancer un build EAS, s'assurer que tous les packages natifs installés sont **correctement configurés** avec leurs plugins Expo dans `app.json`. Les packages natifs non configurés feront échouer le build. Voir la section "Problèmes Connus" pour plus de détails.

---

## 📱 Écrans Implémentés

### 1. **Écran Accueil** (`src/screens/HomeScreen.js`)

**Fonctionnalités :**

- Barre de recherche textuelle (titre, auteur, ISBN)
- Bouton "Rechercher" (appel API Google Books)
- Bouton "Scanner un livre" (ouverture scanner ISBN)
- Design centré verticalement (maquette respectée)

**État actuel :** ✅ UI complète et conforme à la maquette, logique API à implémenter

---

### 2. **Écran Bibliothèque** (`src/screens/LibraryScreen.js`)

**Fonctionnalités :**

- Grille 2 colonnes avec FlatList optimisée
- Filtres horizontaux (Tous, Lus, En cours, Wishlist, Prêtés, Empruntés)
- Compteur de livres dynamique
- Bouton tri (à implémenter)
- État vide avec CTA "Ajouter un livre"
- Bouton flottant "+" pour ajouter un livre

**État actuel :** ✅ UI complète, données SQLite à brancher

---

### 3. **Écran Profil** (`src/screens/ProfileScreen.js`)

**Fonctionnalités :**

**Mode non connecté :**

- Boutons "Continuer avec Google"
- Boutons "Continuer avec Apple"
- Message info "Auth optionnelle"

**Mode connecté :**

- Avatar utilisateur (photo ou initiales)
- Nom et email
- Statistiques rapides (Total livres, Lus, Wishlist)
- Options : Notifications, Thème, Sauvegarde, À propos
- Bouton déconnexion

**État actuel :** ✅ UI complète, AuthService à implémenter

---

### 4. **Écran Statistiques** (`src/screens/StatScreen.js`)

**Fonctionnalités :**

- Placeholder temporaire avec titre "Statistiques (à implémenter)"
- Header réutilisable intégré
- SafeAreaView pour gestion des zones sûres
- Architecture cohérente avec les autres écrans

**État actuel :** ✅ Structure créée, contenu à implémenter avec StatsService

---

### 5. **Menu Drawer** (`src/components/CustomDrawerContent.js`)

**Fonctionnalités :**

- Header avec titre "Ma Bibliothèque"
- Navigation automatique (Scanner un livre, Voir mes livres, Statistiques)
- Écran Profil masqué (accessible uniquement via icône header)
- Footer avec version et informations produit

**État actuel :** ✅ Complet et simplifié

---

### 6. **Architecture Navigation**

**Hiérarchie :**

```
App.js (SafeAreaProvider)
  └─ RootNavigator (NavigationContainer)
      └─ DrawerNavigator
          ├─ HomeStack ("Scanner un livre")
          │   └─ HomeMain (HomeScreen)
          ├─ LibraryStack ("Voir mes livres")
          │   └─ LibraryMain (LibraryScreen)
          ├─ StatStack ("Statistiques") → NOUVEAU
          │   └─ Statistics (StatScreen)
          └─ ProfileStack (masqué du Drawer)
              └─ ProfileMain (ProfileScreen)
```

**Headers personnalisés :**

- **HomeStack, LibraryStack & StatStack** : Bouton burger (gauche) + icône profil (droite)
- **ProfileStack** : Bouton burger (gauche) uniquement

**Navigation vers Profil :**

- Depuis Home/Library : Clic sur icône `person-circle-outline` (headerRight)
- Navigation : `navigation.navigate('Profil')` (nom du Drawer.Screen)

---

## 🔧 Configuration EAS Build

### Profils de Build

#### **Development** (en cours)

```json
{
  "developmentClient": true,
  "distribution": "internal",
  "ios": { "simulator": true },
  "android": { "buildType": "apk" }
}
```

- **Usage** : Développement quotidien
- **Inclut** : Expo Dev Client, Fast Refresh, Debugging
- **Output** : APK Android ou .app iOS Simulator

#### **Preview**

- **Usage** : Tests internes avant production
- **Distribution** : Interne uniquement
- **Output** : APK optimisé (pas de Dev Client)

#### **Production**

- **Usage** : Publication App Store / Google Play
- **Output** : Version finale minifiée et signée

### Identifiants du Projet

- **Project ID EAS** : `41b31d57-375b-4256-96ac-ddbe988a1e37`
- **Bundle ID iOS** : `com.candice.booklibraryapp`
- **Package Android** : `com.candice.booklibraryapp`
- **Slug Expo** : `BookLibraryApp`

### Permissions Configurées

**Android** (`app.json:26-30`) :

- `CAMERA` → Scanner ISBN
- `READ_EXTERNAL_STORAGE` → Accès images
- `WRITE_EXTERNAL_STORAGE` → Sauvegarde données

**iOS** :

- Demandées au runtime via plugins Expo

---

## 🗄️ Schéma Base de Données (SQLite)

### Table `books`

| Colonne          | Type                | Description                       |
| ---------------- | ------------------- | --------------------------------- |
| `id`             | INTEGER PRIMARY KEY | ID auto-incrémenté                |
| `isbn`           | TEXT UNIQUE         | ISBN-10 ou ISBN-13                |
| `title`          | TEXT NOT NULL       | Titre du livre                    |
| `author`         | TEXT                | Auteur principal                  |
| `description`    | TEXT                | Résumé du livre                   |
| `cover_url`      | TEXT                | URL image de couverture           |
| `publisher`      | TEXT                | Éditeur                           |
| `published_date` | TEXT                | Date de publication               |
| `page_count`     | INTEGER             | Nombre de pages                   |
| `language`       | TEXT                | Code langue (fr, en, etc.)        |
| `categories`     | TEXT                | Genres (JSON array)               |
| `created_at`     | DATETIME            | Date d'ajout dans la bibliothèque |
| `updated_at`     | DATETIME            | Dernière modification             |

### Table `user_book_data`

| Colonne           | Type                | Description                              |
| ----------------- | ------------------- | ---------------------------------------- |
| `id`              | INTEGER PRIMARY KEY | ID auto-incrémenté                       |
| `book_id`         | INTEGER FOREIGN KEY | Référence vers `books.id`                |
| `status`          | TEXT                | `to_read`, `reading`, `read`, `wishlist` |
| `is_favorite`     | BOOLEAN             | Livre favori (0/1)                       |
| `personal_rating` | INTEGER             | Note personnelle (1-5)                   |
| `notes`           | TEXT                | Notes personnelles                       |
| `lent_to`         | TEXT                | Nom de la personne (si prêté)            |
| `lent_date`       | DATETIME            | Date du prêt                             |
| `borrowed_from`   | TEXT                | Nom de la personne (si emprunté)         |
| `borrowed_date`   | DATETIME            | Date de l'emprunt                        |
| `read_date`       | DATETIME            | Date de lecture (si lu)                  |

### Table `reading_sessions` (Future - Statistiques avancées)

| Colonne      | Type                | Description               |
| ------------ | ------------------- | ------------------------- |
| `id`         | INTEGER PRIMARY KEY | ID auto-incrémenté        |
| `book_id`    | INTEGER FOREIGN KEY | Référence vers `books.id` |
| `start_date` | DATETIME            | Début de la session       |
| `end_date`   | DATETIME            | Fin de la session         |
| `pages_read` | INTEGER             | Pages lues                |

---

## 🔌 APIs Externes

### Google Books API

**Endpoint de recherche :**

```
GET https://www.googleapis.com/books/v1/volumes?q={query}
```

**Paramètres :**

- `q` : Requête (titre, auteur, ISBN)
- `maxResults` : Nombre de résultats (défaut: 10)
- `printType` : `books` (exclut magazines)
- `langRestrict` : `fr` (optionnel)

**Exemple recherche par ISBN :**

```
GET https://www.googleapis.com/books/v1/volumes?q=isbn:9782253004226
```

**Structure réponse :**

```json
{
  "items": [
    {
      "volumeInfo": {
        "title": "Le Seigneur des Anneaux",
        "authors": ["J.R.R. Tolkien"],
        "publisher": "Le Livre de Poche",
        "publishedDate": "1972",
        "description": "...",
        "pageCount": 576,
        "categories": ["Fiction"],
        "imageLinks": {
          "thumbnail": "http://...",
          "smallThumbnail": "http://..."
        },
        "industryIdentifiers": [
          { "type": "ISBN_13", "identifier": "9782253004226" }
        ],
        "language": "fr"
      }
    }
  ]
}
```

---

### OpenLibrary API

**Endpoint recherche ISBN :**

```
GET https://openlibrary.org/isbn/{isbn}.json
```

**Endpoint recherche textuelle :**

```
GET https://openlibrary.org/search.json?q={query}
```

**Structure réponse :**

```json
{
  "title": "The Lord of the Rings",
  "authors": [{ "name": "J.R.R. Tolkien" }],
  "publishers": ["Houghton Mifflin"],
  "publish_date": "1954",
  "number_of_pages": 1178,
  "isbn_13": ["9780618640157"],
  "covers": [8739161]
}
```

**Construction URL couverture :**

```
https://covers.openlibrary.org/b/id/{cover_id}-L.jpg
```

---

## 🔄 Workflow de Recherche/Ajout de Livre

```
┌─────────────────────────────────────┐
│  Utilisateur entre ISBN ou titre    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Appel Google Books API             │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │ Trouvé ?    │
        └──────┬──────┘
               │
        ┌──────┴──────────┐
        │ OUI             │ NON
        ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│ Normaliser   │  │ Appel OpenLibrary│
│ données      │  │ API (fallback)   │
└──────┬───────┘  └──────┬───────────┘
       │                 │
       │          ┌──────┴──────┐
       │          │ Trouvé ?    │
       │          └──────┬──────┘
       │                 │
       │          ┌──────┴──────────┐
       │          │ OUI             │ NON
       │          ▼                 ▼
       │   ┌──────────────┐  ┌───────────────┐
       │   │ Normaliser   │  │ Formulaire    │
       │   │ données      │  │ saisie manuelle│
       │   └──────┬───────┘  └───────┬───────┘
       │          │                  │
       └──────────┴──────────────────┘
                  │
                  ▼
         ┌─────────────────┐
         │ Enregistrer     │
         │ dans SQLite     │
         └─────────────────┘
                  │
                  ▼
         ┌─────────────────┐
         │ Navigation vers │
         │ Fiche Livre     │
         └─────────────────┘
```

---

## 📊 Statistiques Implémentables (MVP)

### Statistiques Basiques (À implémenter)

- **Total de livres** dans la bibliothèque
- **Livres lus** (count where status = 'read')
- **Livres en cours** (count where status = 'reading')
- **Wishlist** (count where status = 'wishlist')
- **Livres prêtés** (count where lent_to IS NOT NULL)
- **Livres empruntés** (count where borrowed_from IS NOT NULL)

### Statistiques par Genre

```sql
SELECT categories, COUNT(*) as count
FROM books
GROUP BY categories
ORDER BY count DESC
LIMIT 5
```

### Statistiques Temporelles

- **Livres lus ce mois** (count where read_date >= début du mois)
- **Livres ajoutés ce mois** (count where created_at >= début du mois)

---

## 🚧 Modules à Implémenter

### 1. **BookService** (Priorité 1)

**Fichier** : `services/BookService.js`

**Méthodes :**

```javascript
// Recherche par ISBN
searchByISBN(isbn) → Promise<Book>

// Recherche textuelle
searchByQuery(query) → Promise<Book[]>

// Appel Google Books
fetchFromGoogleBooks(query) → Promise<RawData>

// Appel OpenLibrary (fallback)
fetchFromOpenLibrary(query) → Promise<RawData>

// Normalisation données
normalizeBookData(rawData, source) → Book
```

---

### 2. **DatabaseService** (Priorité 1)

**Fichier** : `services/DatabaseService.js`

**Méthodes :**

```javascript
// Initialisation DB
initDatabase() → Promise<void>

// CRUD Livres
addBook(book) → Promise<id>
updateBook(id, book) → Promise<void>
deleteBook(id) → Promise<void>
getBookById(id) → Promise<Book>
getAllBooks() → Promise<Book[]>

// Filtres
getBooksByStatus(status) → Promise<Book[]>
getBooksByGenre(genre) → Promise<Book[]>
searchBooks(query) → Promise<Book[]>

// Statistiques
getStats() → Promise<Stats>
```

---

### 3. **ScanScreen** (Priorité 2)

**Fichier** : `src/screens/ScanScreen.js`

**Fonctionnalités :**

- Caméra avec `expo-camera`
- Détection automatique ISBN (EAN-13, EAN-8) via `barCodeScannerSettings`
- Overlay UI avec guide de scan
- Feedback visuel au scan
- Appel automatique BookService après scan

**Note technique :**

- `expo-camera` remplace `expo-barcode-scanner` (incompatible avec Expo SDK 54)
- Utilise la prop `barCodeScannerSettings` pour activer le scan de codes-barres

---

### 4. **BookDetailScreen** (Priorité 2)

**Fichier** : `src/screens/BookDetailScreen.js`

**Fonctionnalités :**

- Affichage couverture + infos livre
- Boutons action (Marquer comme lu, Ajouter wishlist, etc.)
- Champs personnalisables (Notes, Rating, Prêt/Emprunt)
- Édition/Suppression livre

---

### 5. **AuthService** (Priorité 3)

**Fichier** : `services/AuthService.js`

**Méthodes :**

```javascript
// Google Sign-In
loginWithGoogle() → Promise<User>

// Apple Sign-In
loginWithApple() → Promise<User>

// Déconnexion
logout() → Promise<void>

// État utilisateur
getCurrentUser() → User | null
```

---

### 6. **StatsService** (Priorité 3)

**Fichier** : `services/StatsService.js`

**Méthodes :**

```javascript
// Stats globales
getGlobalStats() → Promise<Stats>

// Stats par période
getStatsByMonth(year, month) → Promise<Stats>

// Top genres
getTopGenres(limit) → Promise<Genre[]>
```

---

## 🐛 Problèmes Connus & Solutions

### ❌ Problème 1 : Expo Go + Worklets Mismatch

**Erreur :**

```
WorkletsError: [Worklets] Mismatch between JavaScript part
and native part of Worklets (0.6.1 vs 0.5.1)
```

**Cause :**

- Expo Go SDK 54 embarque `react-native-worklets-core` 0.5.1
- `react-native-reanimated` 4.x (dépendance du Drawer) requiert 0.6.1

**Solution :**
✅ Utiliser un **Development Build EAS** au lieu d'Expo Go

---

### ✅ Problème 2 : NativeWind Configuration

**Erreur initiale :**

```
Tailwind CSS has not been configured with the NativeWind preset
```

**Solution appliquée :**
Ajout dans [tailwind.config.js:8](tailwind.config.js#L8) :

```javascript
presets: [require('nativewind/preset')];
```

---

### ✅ Problème 3 : Incompatibilité expo-barcode-scanner avec Expo SDK 54 (RÉSOLU)

**Erreur initiale (build iOS) :**

```
🍏 iOS build failed:
'ExpoModulesCore/EXBarcodeScannerInterface.h' file not found
could not build Objective-C module 'EXBarCodeScanner'
```

**Erreur Android (après réinstallation) :**

```
🤖 Android build failed:
expo-barcode-scanner incompatible avec Expo SDK 54
```

**Cause :**

- `expo-barcode-scanner` est **obsolète et incompatible** avec Expo SDK 54
- Ce package a été déprécié au profit de `expo-camera`
- EAS Build échoue même avec le plugin auto-configuré

**Solution appliquée :**
✅ **Phase 1 (tests initiaux)** : Suppression temporaire pour corriger le build iOS
✅ **Phase 2 (développement Android)** : Réinstallation de expo-barcode-scanner → échec du build
✅ **Phase 3 (migration finale)** : Remplacement par `expo-camera` (compatible Expo SDK 54)

**Migration vers expo-camera :**

```bash
npm uninstall expo-barcode-scanner
npx expo install expo-camera
```

**Différences clés :**

- `expo-barcode-scanner` : Package dédié (déprécié)
- `expo-camera` : Package unifié caméra + scan de codes-barres via `barCodeScannerSettings`

**Statut actuel :**

- ✅ `expo-camera` installé et compatible avec Expo SDK 54
- ✅ Build Android Development fonctionnel
- ⏳ Implémentation du scanner dans ScanScreen à venir

---

### ✅ Problème 4 : EAS CLI - appVersionSource Warning

**Avertissement :**

```
The field "cli.appVersionSource" is not set, but it will be required in the future.
```

**Solution appliquée :**
Ajout dans [eas.json:4](eas.json#L4) :

```json
"appVersionSource": "remote"
```

**Explication :**

- `"remote"` : EAS gère automatiquement les versions de build
- `"local"` : Utilise la version depuis `app.json` (manuel)

---

### ✅ Problème 5 : Dossier `app/` et `Drawer.js` Non Utilisés

**Contexte :**

- Un dossier `app/` existait avec des fichiers utilisant **Expo Router** (`router.push`, file-based routing)
- Un fichier `Drawer.js` à la racine utilisait également Expo Router
- Le projet utilise en réalité **React Navigation** (Drawer + Stack)
- Les fichiers actifs sont dans `src/screens/` et chargés via `App.js`

**Solution appliquée :**
✅ Suppression du dossier `app/` et du fichier `Drawer.js` pour éviter la confusion entre deux architectures de navigation parallèles

**Fichiers supprimés :**

- `app/index.js` - Écran d'accueil alternatif
- `app/library.js` - Écran bibliothèque alternatif
- `app/profile.js` - Écran profil alternatif
- `app/stats.js` - Écran statistiques
- `Drawer.js` - Configuration Expo Router inutilisée

**Restructuration effectuée :**

- Tous les fichiers déplacés dans `src/`
- Noms de fichiers et fonctions convertis en anglais
- Textes utilisateur conservés en français

---

### ✅ Problème 6 : Configuration Babel et NativeWind v4 (RÉSOLU)

**Erreurs rencontrées :**

1. `Cannot find module 'babel-preset-expo'`
2. `[BABEL] .plugins is not a valid Plugin property`
3. ESLint : "No Babel config file detected"
4. Styles Tailwind ne s'appliquent pas

**Causes :**

- Package `babel-preset-expo` manquant (non installé par défaut)
- Plugin `nativewind/babel` incompatible avec NativeWind v4
- Tailwind `content` paths pointaient vers `./screens/` au lieu de `./src/`
- ESLint nécessitait `requireConfigFile: false`

**Solutions appliquées :**

1. **Installation babel-preset-expo** :

```bash
npm install --save-dev babel-preset-expo
```

2. **Configuration babel.config.js** :

```javascript
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'react-native-reanimated/plugin', // Doit être en dernier
  ],
};
```

**Note :** Le plugin `nativewind/babel` a été **retiré** car incompatible avec NativeWind v4 (qui fonctionne uniquement via Metro)

3. **Correction tailwind.config.js** :

```javascript
content: [
  "./App.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}", // Avant: ./screens/**, ./components/**
],
```

4. **Configuration ESLint** (.eslintrc.js) :

```javascript
parserOptions: {
  requireConfigFile: false,
  babelOptions: {
    presets: ['@babel/preset-react'],
  },
},
```

**Statut actuel :**

- ✅ Babel fonctionne correctement
- ✅ NativeWind v4 opérationnel (via Metro uniquement)
- ✅ Styles Tailwind s'appliquent
- ✅ ESLint ne génère plus d'erreurs

---

## 📝 Conventions de Code

### Nommage

- **Fichiers** : PascalCase pour composants (`HomeScreen.js`), camelCase pour services (`bookService.js`)
- **Composants** : PascalCase (`HomeScreen`, `CustomDrawerContent`)
- **Fonctions** : camelCase (`handleSearch`, `fetchFromAPI`)
- **Constantes** : SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Variables** : camelCase (`searchQuery`, `bookList`)
- **Langue** : Noms de fichiers/fonctions en anglais, textes UI en français

### Structure des Composants

```javascript
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';

/**
 * Description du composant
 *
 * @param {Object} props - Props du composant
 * @param {Function} props.onPress - Callback au clic
 */
export default function MonComposant({ onPress }) {
  // États locaux
  const [data, setData] = useState(null);

  // Effets
  useEffect(() => {
    // ...
  }, []);

  // Fonctions handlers
  const handleAction = () => {
    // ...
  };

  // Rendu
  return (
    <View>
      <Text>Contenu</Text>
    </View>
  );
}
```

### Commentaires

- **JSDoc** pour fonctions publiques et services
- **Commentaires inline** pour logique complexe
- **TODO** pour features à implémenter

---

## 🎯 Roadmap MVP

### Phase 1 : Foundation ✅ (Complétée - 5 décembre 2025)

- [x] Setup projet Expo SDK 54
- [x] Configuration NativeWind avec preset
- [x] Navigation Drawer + Stack (React Navigation 7)
- [x] Écrans de base (Accueil, Bibliothèque, Profil)
- [x] Menu Drawer personnalisé
- [x] Configuration EAS Build (eas.json + app.json)
- [x] Résolution problèmes build (packages natifs non configurés)
- [x] Configuration `appVersionSource: remote`
- [x] EAS Project ID configuré : `41b31d57-375b-4256-96ac-ddbe988a1e37`
- [x] Development Build Android fonctionnel
- [x] Nettoyage architecture : suppression dossier `app/` (Expo Router non utilisé)
- [x] Restructuration : migration vers dossier `src/` avec noms en anglais
- [x] Migration de expo-barcode-scanner vers expo-camera (Expo SDK 54 compatible)

### Phase 2 : Core Features 🚧 (En cours)

- [ ] BookService (Google Books + OpenLibrary)
- [ ] DatabaseService (SQLite)
- [ ] Scanner ISBN avec expo-camera
- [ ] Écran détail livre
- [ ] CRUD livres complet

### Phase 3 : Enhanced Features

- [ ] Filtres avancés bibliothèque
- [ ] Gestion prêts/emprunts
- [ ] Notes et rating personnels
- [ ] Écran Statistiques

### Phase 4 : Polish

- [ ] Authentification Google/Apple
- [ ] Optimisation performances
- [ ] Gestion d'erreurs robuste
- [ ] Tests utilisateurs
- [ ] Publication stores (optionnel)

---

## 🔐 Sécurité & Best Practices

### Gestion des Secrets

- ❌ **Ne jamais commit** de clés API dans le code
- ✅ Utiliser `.env` avec `expo-constants`
- ✅ Ajouter `.env` dans `.gitignore`

### Permissions

- ✅ Demander permissions au runtime (pas au démarrage)
- ✅ Expliquer pourquoi chaque permission est nécessaire
- ✅ Gérer les refus de permission gracieusement

### Données Utilisateur

- ✅ SQLite chiffré pour données sensibles (future)
- ✅ Pas de collecte de données personnelles (MVP)
- ✅ Export/Import des données (future)

---

## 📚 Resources & Liens

### Documentation Officielle

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [NativeWind](https://www.nativewind.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Google Books API](https://developers.google.com/books/docs/v1/using)
- [OpenLibrary API](https://openlibrary.org/developers/api)

### Outils

- [Expo Dashboard](https://expo.dev/accounts/candyfair/projects/BookLibraryApp)
- [ISBN Validator](https://www.isbn.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 👤 Informations Projet

- **Développeur** : Candice
- **Compte Expo** : @candyfair
- **Project ID** : `41b31d57-375b-4256-96ac-ddbe988a1e37`
- **Version actuelle** : 1.0.0 (MVP en développement)
- **Branche active** : `page-cleaning`
- **Dernière mise à jour** : 9 décembre 2025

---

## 🤝 Contribution Future

Si ce projet évolue vers l'open-source :

1. Fork le repo
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Projet personnel - Tous droits réservés (pour le MVP)

---

## 📝 Notes Personnelles

> **Section réservée à vos notes, réflexions et TODOs personnels.**
> Cette section ne sera jamais modifiée par Claude, sauf instruction explicite de votre part.

### Idées & Réflexions

Fonctions :

- Mettre les appels API en place
- Prévoir le multilangue

Pré-formattage :

- Mettre en place un toggle pour déselectionner un genre/filtre

Styles :

- Ajouter polices
- Configurer les couleurs du thème (mais pas de dark mode)
- Convertir le titre "Ma bibliothèque" en SVG pour la page de scanner, afin qu'il soit toujours à la bonne taille qu'elle que soit la résolution d'écran

Maquette :

- Ecran Statistiques à créer

### TODOs Personnels

NEXT :

- Intégrer liens vers vues filtrées au Drawer
- Remplacer écrans login + profil par modales

### Questions à Résoudre

- Quelle librairie utiliser pour les appels API ?

---

**🚀 Bon développement !**

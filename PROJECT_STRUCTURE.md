# BookLibraryApp - Structure du projet avec Expo Router

## Arborescence complète

```
BookLibraryApp/
├── app/                          # Expo Router - Navigation basée sur les fichiers
│   ├── (drawer)/                 # Layout Drawer (navigation principale)
│   │   ├── _layout.js           # Configuration du Drawer
│   │   ├── index.js             # Écran d'accueil (recherche + scan)
│   │   ├── library.js           # Bibliothèque (grille de livres)
│   │   ├── profile.js           # Profil utilisateur
│   │   └── stats.js             # Statistiques
│   ├── book/                    # Stack pour les fiches livres
│   │   └── [id].js              # Fiche détaillée d'un livre (dynamique)
│   ├── scan.js                  # Écran de scan ISBN (modal)
│   ├── _layout.js               # Layout racine de l'app
│   └── +not-found.js            # Écran 404
│
├── src/
│   ├── components/              # Composants réutilisables
│   │   ├── common/              # Composants génériques
│   │   │   ├── Button.js        # Bouton personnalisé
│   │   │   ├── Header.js        # En-tête générique
│   │   │   ├── Input.js         # Champ de saisie
│   │   │   ├── Loading.js       # Indicateur de chargement
│   │   │   └── EmptyState.js    # État vide
│   │   ├── book/                # Composants liés aux livres
│   │   │   ├── BookCard.js      # Carte livre (grille)
│   │   │   ├── BookGrid.js      # Grille optimisée FlatList
│   │   │   ├── BookDetail.js    # Vue détaillée
│   │   │   └── BookForm.js      # Formulaire création/édition manuelle
│   │   ├── scan/                # Composants scan
│   │   │   ├── CameraView.js    # Vue caméra pour scan
│   │   │   └── ScanOverlay.js   # Overlay UI du scan
│   │   └── stats/               # Composants statistiques
│   │       ├── StatCard.js      # Carte statistique
│   │       └── GenreChart.js    # Graphique genres
│   │
│   ├── services/                # Logique métier & API
│   │   ├── database/            # SQLite
│   │   │   ├── DatabaseService.js    # Gestion DB (init, queries)
│   │   │   └── schema.js        # Schéma des tables
│   │   ├── api/                 # APIs externes
│   │   │   ├── GoogleBooksAPI.js     # Client Google Books
│   │   │   ├── OpenLibraryAPI.js     # Client OpenLibrary
│   │   │   └── BookNormalizer.js     # Normalisation données
│   │   ├── BookService.js       # Service métier livres
│   │   ├── AuthService.js       # Service authentification
│   │   └── StatsService.js      # Service statistiques
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── useBooks.js          # Hook gestion livres
│   │   ├── useAuth.js           # Hook authentification
│   │   ├── useStats.js          # Hook statistiques
│   │   └── useScanner.js        # Hook scanner
│   │
│   ├── utils/                   # Utilitaires
│   │   ├── constants.js         # Constantes app
│   │   ├── validators.js        # Validation données
│   │   └── formatters.js        # Formatage dates, nombres...
│   │
│   └── contexts/                # Contexts React (si besoin)
│       ├── AuthContext.js       # Context authentification
│       └── BookContext.js       # Context livres
│
├── assets/                      # Ressources statiques
│   ├── images/                  # Images
│   ├── fonts/                   # Polices personnalisées
│   └── icons/                   # Icônes
│
├── global.css                   # Styles NativeWind globaux
├── tailwind.config.js           # Configuration TailwindCSS
├── app.json                     # Configuration Expo
├── babel.config.js              # Configuration Babel
├── package.json                 # Dépendances
└── README.md                    # Documentation projet
```

## Explication de l'architecture Expo Router

### 1. Dossier `app/` - Convention File-Based Routing

**`app/(drawer)/`** : Groupe de routes avec layout Drawer commun
- `_layout.js` : Configure le Drawer Navigator
- `index.js` : Route `/` - Écran d'accueil
- `library.js` : Route `/library` - Bibliothèque
- `profile.js` : Route `/profile` - Profil
- `stats.js` : Route `/stats` - Statistiques

**`app/book/[id].js`** : Route dynamique `/book/:id` - Fiche livre

**`app/scan.js`** : Route `/scan` - Modal scan (présentation modale)

**`app/_layout.js`** : Layout racine (providers, auth check, etc.)

### 2. Dossier `src/` - Code métier

**`components/`** : Composants UI réutilisables organisés par domaine

**`services/`** : Logique métier isolée (APIs, DB, calculs)
- Facilite les tests
- Prépare la migration Firebase future
- Séparation des responsabilités

**`hooks/`** : Logique réutilisable avec state management

**`utils/`** : Fonctions pures utilitaires

**`contexts/`** : State global (Auth, Livres) si nécessaire

### 3. Flux de données typique

```
Écran (app/)
  → Hook (hooks/)
    → Service (services/)
      → API externe OU SQLite (database/)
```

## Navigation avec Expo Router

### Exemples de navigation dans le code

```javascript
// Navigation simple
import { router } from 'expo-router';
router.push('/library');

// Navigation avec paramètres
router.push(`/book/${bookId}`);

// Retour arrière
router.back();

// Modal
router.push({
  pathname: '/scan',
  params: { mode: 'isbn' }
});
```

### Structure des Layouts

```javascript
// app/_layout.js - Root layout
<Stack>
  <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
  <Stack.Screen name="book/[id]" options={{ presentation: 'card' }} />
  <Stack.Screen name="scan" options={{ presentation: 'modal' }} />
</Stack>

// app/(drawer)/_layout.js - Drawer layout
<Drawer>
  <Drawer.Screen name="index" options={{ title: 'Accueil' }} />
  <Drawer.Screen name="library" options={{ title: 'Bibliothèque' }} />
  <Drawer.Screen name="stats" options={{ title: 'Statistiques' }} />
  <Drawer.Screen name="profile" options={{ title: 'Profil' }} />
</Drawer>
```

## Avantages de cette structure

✅ **Scalabilité** : Facile d'ajouter des écrans/features
✅ **Maintenabilité** : Code organisé par responsabilité
✅ **Testabilité** : Services isolés, faciles à mocker
✅ **Migration Firebase** : Services prêts à switcher le backend
✅ **Expo Router** : Navigation type-safe, deep linking natif
✅ **Performance** : Composants optimisés, lazy loading possible

## Prochaines étapes de génération

1. ✅ Structure créée
2. ⏳ Configuration Expo Router (layouts)
3. ⏳ DatabaseService + schema SQLite
4. ⏳ BookService (Google Books + OpenLibrary)
5. ⏳ AuthService (Google + Apple)
6. ⏳ Écrans principaux
7. ⏳ Composants réutilisables
8. ⏳ Hooks custom


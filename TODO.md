# Base de données locale (SQLite) - Plan des étapes

## Objectif

Installer `expo-sqlite` et implémenter le `DatabaseService` pour permettre l'ajout, la consultation, la modification et la suppression de livres dans une base de données locale. Brancher le bouton "Ajouter" de la liste de résultats et de la modale détail sur ce service.

---

## Fichiers à créer

| Fichier                           | Description                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `src/services/DatabaseService.js` | Service CRUD complet (init DB, ajout, lecture, mise à jour, suppression de livres) |

## Fichiers à modifier

| Fichier                                   | Modification                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `src/screens/HomeScreen.js`               | Brancher le bouton "Ajouter" sur `DatabaseService.addBook()`                                      |
| `src/components/BookDetailBottomSheet.js` | Ajouter un bouton "Ajouter à ma bibliothèque" qui appelle `DatabaseService.addBook()`             |
| `src/screens/LibraryScreen.js`            | Remplacer les données fictives par les livres issus de SQLite via `DatabaseService.getAllBooks()` |
| `App.js`                                  | Appeler `DatabaseService.initDatabase()` au démarrage de l'application                            |

---

## Étapes de réalisation

### 1. Installer expo-sqlite

- ✅ Installer le package avec `npx expo install expo-sqlite`
- ✅ Vérifier la compatibilité avec Expo SDK 54

### 2. Créer le DatabaseService

- ✅ Fonction `initDatabase()` : créer les tables `books` et `user_book_data` si elles n'existent pas
- ✅ Fonction `addBook(book)` : insérer un livre normalisé (depuis BookService) dans la table `books`
- ✅ Fonction `getBookById(id)` : récupérer un livre par son ID
- ✅ Fonction `getAllBooks()` : récupérer tous les livres de la bibliothèque
- ✅ Fonction `getBooksByStatus(status)` : filtrer par statut (`to_read`, `reading`, `read`, `wishlist`)
- ✅ Fonction `updateBook(id, data)` : mettre à jour un livre existant
- ✅ Fonction `deleteBook(id)` : supprimer un livre
- ✅ Fonction `bookExists(isbn)` : vérifier si un livre est déjà dans la bibliothèque (éviter les doublons)
- Gestion des erreurs pour chaque opération

### 3. Initialiser la DB au démarrage

- Appeler `initDatabase()` dans `App.js` (via `useEffect`)
- Gérer les erreurs d'initialisation

### 4. Brancher le bouton "Ajouter" (HomeScreen)

- Importer `DatabaseService.addBook()` dans HomeScreen
- Implémenter `handleAddBook(book)` : appeler `addBook()` et afficher un feedback (succès/erreur/doublon)
- Connecter le bouton "Ajouter" existant à cette fonction

### 5. Brancher le bouton "Ajouter" (BookDetailBottomSheet)

- Ajouter un bouton "Ajouter à ma bibliothèque" dans la modale détail
- Même logique que HomeScreen : appel `addBook()` + feedback utilisateur
- Vérifier si le livre existe déjà via `bookExists(isbn)`

### 6. Afficher les livres dans LibraryScreen

- Charger les livres depuis SQLite au montage de l'écran (`getAllBooks()`)
- Remplacer les données fictives par les données réelles
- Brancher les filtres existants sur `getBooksByStatus(status)`

---

## Schéma des tables (rappel)

### Table `books`

| Colonne          | Type                | Description                |
| ---------------- | ------------------- | -------------------------- |
| `id`             | INTEGER PRIMARY KEY | ID auto-incrémenté         |
| `isbn`           | TEXT UNIQUE         | ISBN-10 ou ISBN-13         |
| `title`          | TEXT NOT NULL       | Titre du livre             |
| `author`         | TEXT                | Auteur principal           |
| `description`    | TEXT                | Résumé du livre            |
| `cover_url`      | TEXT                | URL image de couverture    |
| `publisher`      | TEXT                | Éditeur                    |
| `published_date` | TEXT                | Date de publication        |
| `page_count`     | INTEGER             | Nombre de pages            |
| `language`       | TEXT                | Code langue (fr, en, etc.) |
| `categories`     | TEXT                | Genres (JSON array)        |
| `created_at`     | DATETIME            | Date d'ajout               |
| `updated_at`     | DATETIME            | Dernière modification      |

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

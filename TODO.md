# Base de données locale (SQLite) - Plan des étapes

## Objectif

Installer `expo-sqlite` et implémenter le `DatabaseService` pour permettre l'ajout, la consultation, la modification et la suppression de livres dans une base de données locale. Brancher le bouton "Ajouter" de la liste de résultats et de la modale détail sur ce service.

---

## Fichiers créés

| Fichier                           | Description                                                                        | Statut |
| --------------------------------- | ---------------------------------------------------------------------------------- | ------ |
| `src/services/DatabaseService.js` | Service CRUD complet (init DB, ajout, lecture, mise à jour, suppression de livres) | ✅     |
| `src/screens/BookEditScreen.js`   | Écran de détail/édition d'un livre avec tous les champs de la BDD                  | ✅     |

## Fichiers modifiés

| Fichier                                   | Modification                                                                                      | Statut |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- | ------ |
| `src/screens/HomeScreen.js`               | Brancher le bouton "Ajouter" sur `DatabaseService.addBook()` + navigation vers BookEditScreen     | ✅     |
| `src/components/BookDetailBottomSheet.js` | Bouton "Ajouter à ma bibliothèque" connecté à `addBook()` + navigation vers BookEditScreen        | ✅     |
| `src/screens/LibraryScreen.js`            | Chargement des livres depuis SQLite + clic sur livre ouvre BookEditScreen                         | ✅     |
| `src/navigation/LibraryStack.js`          | Ajout de la route BookEdit vers BookEditScreen                                                    | ✅     |
| `src/navigation/RootNavigator.js`         | Déplacement des bottom sheets à l'intérieur du NavigationContainer                                | ✅     |
| `App.js`                                  | Nettoyage des imports (bottom sheets déplacées dans RootNavigator)                                | ✅     |

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
- ✅ Gestion des erreurs pour chaque opération

### 3. Initialiser la DB au démarrage

- ✅ Appeler `initDatabase()` dans `App.js`
- ✅ Gérer les erreurs d'initialisation

### 4. Brancher le bouton "Ajouter" (HomeScreen)

- ✅ Importer `DatabaseService.addBook()` dans HomeScreen
- ✅ Implémenter `handleAddBook(book)` : appeler `addBook()` et afficher un feedback (succès/erreur/doublon)
- ✅ Connecter le bouton "Ajouter" existant à cette fonction
- ✅ Redirection vers BookEditScreen après ajout

### 5. Brancher le bouton "Ajouter" (BookDetailBottomSheet)

- ✅ Bouton "Ajouter à ma bibliothèque" connecté à `addBook()`
- ✅ Vérification si le livre existe déjà via `bookExists(isbn)`
- ✅ Fermeture de la modale et redirection vers BookEditScreen après ajout

### 6. Afficher les livres dans LibraryScreen

- ✅ Charger les livres depuis SQLite au focus de l'écran (`getAllBooks()`)
- ✅ Remplacer les données fictives par les données réelles
- ✅ Clic sur un livre ouvre BookEditScreen
- Brancher les filtres existants sur `getBooksByStatus(status)` (à faire)

### 7. Créer BookEditScreen (NOUVEAU)

- ✅ Afficher tous les champs du livre depuis la BDD
- ✅ Permettre l'édition de chaque champ
- ✅ Bouton Sauvegarder avec `updateBook()`
- ✅ Bouton Supprimer avec `deleteBook()` et confirmation
- ✅ Gestion des modifications non sauvegardées

---

## Prochaines étapes

### Phase 2.5 : Améliorations BookEditScreen

- [ ] Ajouter les champs `user_book_data` (statut, favori, notes, rating, prêt/emprunt)
- [ ] Picker pour le statut (à lire, en cours, lu, wishlist)
- [ ] Toggle pour les favoris
- [ ] Champ notes multilignes
- [ ] Rating avec étoiles (1-5)
- [ ] Gestion prêts/emprunts (nom, date)

### Phase 2.6 : Filtres LibraryScreen

- [ ] Brancher les filtres de statut sur `getBooksByStatus(status)`
- [ ] Brancher les filtres de genres sur les catégories
- [ ] Brancher le filtre favoris sur `is_favorite`

### Phase 3 : Statistiques

- [ ] Implémenter StatsService pour calculer les statistiques
- [ ] Afficher les stats dans StatScreen (total, lus, en cours, wishlist, prêtés)

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

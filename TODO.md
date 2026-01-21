# Intégration Google Books API - Plan des étapes

### Fichiers à créer

| Fichier                               | Description                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `src/services/BookService.js`         | ✅ Service principal pour les appels API (Google Books + OpenLibrary en fallback) |
| ~~`src/utils/normalizer.js`~~         | ✅ Normalisation des données reçues des différentes APIs vers un format unifié    |
| ~~`src/screens/BookDetailScreen.js`~~ | ~~Écran d'affichage des résultats après scan ou recherche~~                       |

### Fichiers à modifier

| Fichier         | Modification                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------- |
| `ScanScreen.js` | Appeler BookService après détection ISBN, gérer le loading/erreur, naviguer vers BookDetailScreen |
| `HomeScreen.js` | ✅ Connecter la recherche textuelle au BookService                                                |
| `HomeStack.js`  | Ajouter la route BookDetailScreen dans la stack de navigation                                     |

## Étapes de réalisation

1.  **Créer le BookService**

- ✅ Fonction `searchByISBN(isbn)` → appel Google Books API
- ✅ Fonction `searchByQuery(query)` → recherche textuelle
- ✅ Fonction `fetchFromOpenLibrary(isbn)` → fallback si Google Books ne trouve rien
- ✅ Gestion des erreurs réseau

2.  **Créer le normalizer**

- ✅ Transformer la réponse OpenLibrary en objet `Book` unifié
- ✅ Transformer la réponse Google Books en objet `Book` unifié
- ✅ Gérer les champs manquants (couverture, description, etc.)

3. **Créer BookDetailScreen**

- ✅ Afficher les infos du livre (couverture, titre, auteur, description, ISBN, pages)
- ❌ Bouton "Ajouter à ma bibliothèque" (préparé pour SQLite)
- ✅ Bouton "Scanner un autre livre"
- ❌ État de chargement et gestion des erreurs

4. **Modifier ScanScreen**

- ✅ Après scan, appeler `BookService.searchByISBN(isbn)`
- ❌ Afficher un loader pendant l'appel API
- ❌ Mise en forme de l'affichage du résultat
- ❌ Naviguer vers BookDetailScreen avec les données du livre
- ❌ Gérer le cas "livre non trouvé" (proposer de créer le livre)

5. **Modifier HomeScreen**

- ❌ Ajouter un bouton "Rechercher"
- ❌ Connecter le bouton "Rechercher" à `BookService.searchByQuery()`
- ✅ Afficher les résultats (liste ~~ou navigation vers détail~~)

6. **Mettre à jour la navigation**

- ❌ Ajouter BookDetailScreen dans HomeStack

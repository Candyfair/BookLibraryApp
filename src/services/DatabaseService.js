import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'booklibraryapp.db';

let db = null;

export function initDatabase() {
  db = SQLite.openDatabaseSync(DATABASE_NAME);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      isbn TEXT UNIQUE,
      title TEXT NOT NULL,
      author TEXT,
      description TEXT,
      cover_url TEXT,
      publisher TEXT,
      published_date TEXT,
      page_count INTEGER,
      language TEXT,
      categories TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );  
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS user_book_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER NOT NULL,
      status TEXT DEFAULT 'to_read',
      is_favorite INTEGER DEFAULT 0,
      personal_rating INTEGER,
      notes TEXT,
      lent_to TEXT,
      lent_date DATETIME,
      borrowed_from TEXT,
      borrowed_date DATETIME,
      read_date DATETIME,
      FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    );
  `);

  return db;
}

export function addBook(book) {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  const result = db.runSync(
    `INSERT INTO books (isbn, title, author, description, cover_url, publisher, published_date, page_count, language, categories)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      book.isbn,
      book.title,
      book.author,
      book.description,
      book.coverUrl,
      book.publisher,
      book.publishedDate,
      book.pageCount,
      book.language,
      JSON.stringify(book.categories || []),
    ]
  );

  const bookId = result.lastInsertRowId;

  // Crée l'entrée user_book_data associée
  db.runSync(
    `INSERT INTO user_book_data (book_id, status, is_favorite, personal_rating, notes)
     VALUES (?, 'to_read', 0, NULL, NULL)`,
    [bookId]
  );

  return bookId;
}

/**
 * Normalise une ligne SQLite (snake_case) vers le format JS (camelCase)
 * @param {Object} row - Ligne brute de SQLite
 * @param {boolean} includeUserData - Inclure les données user_book_data
 * @returns {Object} Livre au format normalisé
 */
function normalizeRow(row, includeUserData = false) {
  const book = {
    id: row.id,
    isbn: row.isbn,
    title: row.title,
    author: row.author,
    description: row.description,
    coverUrl: row.cover_url,
    publisher: row.publisher,
    publishedDate: row.published_date,
    pageCount: row.page_count,
    language: row.language,
    categories: JSON.parse(row.categories || '[]'),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  if (includeUserData) {
    book.status = row.status || 'to_read';
    book.isFavorite = row.is_favorite === 1;
    book.personalRating = row.personal_rating;
    book.notes = row.notes;
    book.lentTo = row.lent_to;
    book.lentDate = row.lent_date;
    book.borrowedFrom = row.borrowed_from;
    book.borrowedDate = row.borrowed_date;
    book.readDate = row.read_date;
  }

  return book;
}

/**
 * Récupère un livre par son ID avec ses données utilisateur
 * @param {number} id - ID du livre
 * @returns {Object|null} Livre normalisé avec user_book_data ou null si non trouvé
 */
export function getBookById(id) {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  const row = db.getFirstSync(
    `SELECT b.*, ubd.status, ubd.is_favorite, ubd.personal_rating, ubd.notes,
            ubd.lent_to, ubd.lent_date, ubd.borrowed_from, ubd.borrowed_date, ubd.read_date
     FROM books b
     LEFT JOIN user_book_data ubd ON ubd.book_id = b.id
     WHERE b.id = ?`,
    [id]
  );
  return row ? normalizeRow(row, true) : null;
}

/**
 * Récupère tous les livres de la bibliothèque
 * @returns {Array} Liste de livres normalisés
 */
export function getAllBooks() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  const rows = db.getAllSync('SELECT * FROM books ORDER BY created_at DESC');
  return rows.map(normalizeRow);
}

/**
 * Récupère les livres filtrés par statut
 * @param {string} status - Statut du livre (to_read, reading, read, wishlist)
 * @returns {Array} Liste de livres normalisés
 */
export function getBooksByStatus(status) {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  const rows = db.getAllSync(
    `SELECT b.* FROM books b
     INNER JOIN user_book_data ubd ON ubd.book_id = b.id
     WHERE ubd.status = ?
     ORDER BY b.created_at DESC`,
    [status]
  );
  return rows.map(normalizeRow);
}

/**
 * Met à jour un livre existant
 * @param {number} id - ID du livre
 * @param {Object} data - Champs à mettre à jour (format camelCase)
 * @returns {number} Nombre de lignes modifiées
 */
export function updateBook(id, data) {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  const fieldMap = {
    isbn: 'isbn',
    title: 'title',
    author: 'author',
    description: 'description',
    coverUrl: 'cover_url',
    publisher: 'publisher',
    publishedDate: 'published_date',
    pageCount: 'page_count',
    language: 'language',
    categories: 'categories',
  };

  const setClauses = [];
  const values = [];

  for (const [jsKey, sqlColumn] of Object.entries(fieldMap)) {
    if (jsKey in data) {
      setClauses.push(`${sqlColumn} = ?`);
      const value =
        jsKey === 'categories'
          ? JSON.stringify(data[jsKey] || [])
          : data[jsKey];
      values.push(value);
    }
  }

  if (setClauses.length === 0) {
    return 0;
  }

  setClauses.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  const result = db.runSync(
    `UPDATE books SET ${setClauses.join(', ')} WHERE id = ?`,
    values
  );

  return result.changes;
}

/**
 * Met à jour les données utilisateur d'un livre
 * @param {number} bookId - ID du livre
 * @param {Object} data - Données à mettre à jour (format camelCase)
 * @returns {number} Nombre de lignes modifiées
 */
export function updateUserBookData(bookId, data) {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  const fieldMap = {
    status: 'status',
    isFavorite: 'is_favorite',
    personalRating: 'personal_rating',
    notes: 'notes',
    lentTo: 'lent_to',
    lentDate: 'lent_date',
    borrowedFrom: 'borrowed_from',
    borrowedDate: 'borrowed_date',
    readDate: 'read_date',
  };

  const setClauses = [];
  const values = [];

  for (const [jsKey, sqlColumn] of Object.entries(fieldMap)) {
    if (jsKey in data) {
      setClauses.push(`${sqlColumn} = ?`);
      let value = data[jsKey];
      // Convertit boolean en integer pour is_favorite
      if (jsKey === 'isFavorite') {
        value = value ? 1 : 0;
      }
      values.push(value);
    }
  }

  if (setClauses.length === 0) {
    return 0;
  }

  values.push(bookId);

  const result = db.runSync(
    `UPDATE user_book_data SET ${setClauses.join(', ')} WHERE book_id = ?`,
    values
  );

  return result.changes;
}

/**
 * Supprime un livre par son ID
 * @param {number} id - ID du livre
 * @returns {number} Nombre de lignes supprimées
 */
export function deleteBook(id) {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  const result = db.runSync('DELETE FROM books WHERE id = ?', [id]);
  return result.changes;
}

/**
 * Vérifie si un livre existe déjà dans la bibliothèque par son ISBN
 * @param {string} isbn - ISBN du livre
 * @returns {boolean} true si le livre existe
 */
export function bookExists(isbn) {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  if (!isbn) {
    return false;
  }

  const row = db.getFirstSync('SELECT id FROM books WHERE isbn = ?', [isbn]);
  return row !== null;
}

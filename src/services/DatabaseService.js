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

  return result.lastInsertRowId;
}

/**
 * Normalise une ligne SQLite (snake_case) vers le format JS (camelCase)
 * @param {Object} row - Ligne brute de SQLite
 * @returns {Object} Livre au format normalisé
 */
function normalizeRow(row) {
  return {
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
}

/**
 * Récupère un livre par son ID
 * @param {number} id - ID du livre
 * @returns {Object|null} Livre normalisé ou null si non trouvé
 */
export function getBookById(id) {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first');
  }

  const row = db.getFirstSync('SELECT * FROM books WHERE id = ?', [id]);
  return row ? normalizeRow(row) : null;
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

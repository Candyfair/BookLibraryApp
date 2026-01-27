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

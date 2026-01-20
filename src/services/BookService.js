import axios from 'axios';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
const OPEN_LIBRARY_API_URL = 'https://openlibrary.org';

/**
 * Normalise les données d'un livre provenant de Google Books
 * @param {Object} item - Données brutes de Google Books
 * @returns {Object} Livre normalisé
 */
const normalizeGoogleBooksData = (item) => {
  const volumeInfo = item.volumeInfo || {};
  const identifiers = volumeInfo.industryIdentifiers || [];

  const isbn13 = identifiers.find((id) => id.type === 'ISBN_13')?.identifier;
  const isbn10 = identifiers.find((id) => id.type === 'ISBN_10')?.identifier;

  return {
    id: item.id,
    isbn: isbn13 || isbn10 || null,
    title: volumeInfo.title || 'Titre inconnu',
    author: volumeInfo.authors?.join(', ') || 'Auteur inconnu',
    description: volumeInfo.description || null,
    coverUrl: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    publisher: volumeInfo.publisher || null,
    publishedDate: volumeInfo.publishedDate || null,
    pageCount: volumeInfo.pageCount || null,
    language: volumeInfo.language || null,
    categories: volumeInfo.categories || [],
    source: 'google_books',
  };
};

/**
 * Normalise les données d'un livre provenant de OpenLibrary
 * @param {Object} data - Données brutes de OpenLibrary
 * @returns {Object} Livre normalisé
 */
const normalizeOpenLibraryData = (data) => {
  const coverId = data.covers?.[0];

  return {
    id: data.key || null,
    isbn: data.isbn_13?.[0] || data.isbn_10?.[0] || null,
    title: data.title || 'Titre inconnu',
    author: data.authors?.map((a) => a.name).join(', ') || 'Auteur inconnu',
    description:
      typeof data.description === 'string'
        ? data.description
        : data.description?.value || null,
    coverUrl: coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : null,
    publisher: data.publishers?.[0] || null,
    publishedDate: data.publish_date || null,
    pageCount: data.number_of_pages || null,
    language: data.languages?.[0]?.key?.replace('/languages/', '') || null,
    categories: data.subjects?.slice(0, 5) || [],
    source: 'open_library',
  };
};

/**
 * Recherche un livre par ISBN via Google Books API
 * @param {string} isbn - ISBN-10 ou ISBN-13
 * @returns {Promise<Object|null>} Livre normalisé ou null si non trouvé
 */
export const searchByISBN = async (isbn) => {
  try {
    // Essayer Google Books d'abord
    const googleResult = await fetchFromGoogleBooks(`isbn:${isbn}`);
    if (googleResult && googleResult.length > 0) {
      return googleResult[0];
    }

    // Fallback vers OpenLibrary
    const openLibraryResult = await fetchFromOpenLibrary(isbn);
    if (openLibraryResult) {
      return openLibraryResult;
    }

    return null;
  } catch (error) {
    console.error('Erreur lors de la recherche par ISBN:', error.message);
    throw error;
  }
};

/**
 * Recherche des livres par requête textuelle (titre, auteur, etc.)
 * @param {string} query - Texte de recherche
 * @param {number} maxResults - Nombre maximum de résultats (défaut: 10)
 * @returns {Promise<Array>} Liste de livres normalisés
 */
export const searchByQuery = async (query, maxResults = 10) => {
  try {
    const results = await fetchFromGoogleBooks(query, maxResults);
    return results || [];
  } catch (error) {
    console.error('Erreur lors de la recherche textuelle:', error.message);
    throw error;
  }
};

/**
 * Récupère des livres depuis Google Books API
 * @param {string} query - Requête de recherche
 * @param {number} maxResults - Nombre maximum de résultats
 * @returns {Promise<Array|null>} Liste de livres normalisés ou null
 */
export const fetchFromGoogleBooks = async (query, maxResults = 10) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: query,
        maxResults,
        printType: 'books',
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      return null;
    }

    return response.data.items.map(normalizeGoogleBooksData);
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Erreur Google Books API:', error.message);
    throw error;
  }
};

/**
 * Récupère un livre depuis OpenLibrary API (fallback)
 * @param {string} isbn - ISBN du livre
 * @returns {Promise<Object|null>} Livre normalisé ou null
 */
export const fetchFromOpenLibrary = async (isbn) => {
  try {
    const response = await axios.get(
      `${OPEN_LIBRARY_API_URL}/isbn/${isbn}.json`
    );

    if (!response.data) {
      return null;
    }

    return normalizeOpenLibraryData(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Erreur OpenLibrary API:', error.message);
    throw error;
  }
};

export default {
  searchByISBN,
  searchByQuery,
  fetchFromGoogleBooks,
  fetchFromOpenLibrary,
};

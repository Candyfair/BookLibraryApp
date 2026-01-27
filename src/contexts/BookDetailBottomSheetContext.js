import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

const BookDetailBottomSheetContext = createContext(null);

export function BookDetailBottomSheetProvider({ children }) {
  const bottomSheetRef = useRef(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [fallbackResults, setFallbackResults] = useState([]);
  const [fallbackQuery, setFallbackQuery] = useState(null);
  const [fallbackHasMore, setFallbackHasMore] = useState(false);
  const [fallbackLoadingMore, setFallbackLoadingMore] = useState(false);

  const openBookDetail = useCallback(
    (book, { fallback = [], query = null, hasMore = false } = {}) => {
      setSelectedBook(book);
      setFallbackResults(fallback);
      setFallbackQuery(query);
      setFallbackHasMore(hasMore);
      bottomSheetRef.current?.present();
    },
    []
  );

  const appendFallbackResults = useCallback((newItems, hasMore) => {
    setFallbackResults((prev) => [...prev, ...newItems]);
    setFallbackHasMore(hasMore);
  }, []);

  const closeBookDetail = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleDismiss = useCallback(() => {
    setSelectedBook(null);
    setFallbackResults([]);
    setFallbackQuery(null);
    setFallbackHasMore(false);
  }, []);

  return (
    <BookDetailBottomSheetContext.Provider
      value={{
        bottomSheetRef,
        selectedBook,
        fallbackResults,
        fallbackQuery,
        fallbackHasMore,
        fallbackLoadingMore,
        setFallbackLoadingMore,
        appendFallbackResults,
        openBookDetail,
        closeBookDetail,
        handleDismiss,
      }}
    >
      {children}
    </BookDetailBottomSheetContext.Provider>
  );
}

export function useBookDetailBottomSheet() {
  const context = useContext(BookDetailBottomSheetContext);
  if (!context) {
    throw new Error(
      'useBookDetailBottomSheet doit être utilisé dans un BookDetailBottomSheetProvider'
    );
  }
  return context;
}

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

  const openBookDetail = useCallback((book) => {
    setSelectedBook(book); // stocke le livre sélectionné
    bottomSheetRef.current?.present(); // ouvre la bottom sheet
  }, []);

  const closeBookDetail = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleDismiss = useCallback(() => {
    setSelectedBook(null); // nettoie quand la bottom sheet est fermée
  }, []);

  return (
    <BookDetailBottomSheetContext.Provider
      value={{
        bottomSheetRef,
        selectedBook,
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

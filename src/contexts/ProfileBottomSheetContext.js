import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from 'react';

/**
 * Context pour gérer l'état de la ProfileBottomSheet globalement
 *
 * Permet d'ouvrir/fermer la bottom sheet depuis n'importe quel composant
 */
const ProfileBottomSheetContext = createContext(null);

export function ProfileBottomSheetProvider({ children }) {
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = useCallback(() => {
    // Ouvre la modal au premier snapPoint (index 0 = 92%)
    bottomSheetRef.current?.present();
    setIsOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ProfileBottomSheetContext.Provider
      value={{
        bottomSheetRef,
        isOpen,
        openBottomSheet,
        closeBottomSheet,
        handleDismiss,
      }}
    >
      {children}
    </ProfileBottomSheetContext.Provider>
  );
}

/**
 * Hook pour accéder au ProfileBottomSheet
 *
 * @returns {{ bottomSheetRef, isOpen, openBottomSheet, closeBottomSheet }}
 *
 * @example
 * const { openBottomSheet } = useProfileBottomSheet();
 * <Pressable onPress={openBottomSheet}>Ouvrir profil</Pressable>
 */
export function useProfileBottomSheet() {
  const context = useContext(ProfileBottomSheetContext);
  if (!context) {
    throw new Error(
      'useProfileBottomSheet doit être utilisé dans un ProfileBottomSheetProvider'
    );
  }
  return context;
}

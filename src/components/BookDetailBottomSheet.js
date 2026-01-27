import { useCallback, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

// Context
import { useBookDetailBottomSheet } from '../contexts/BookDetailBottomSheetContext';

export default function BookDetailBottomSheet() {
  const { bottomSheetRef, selectedBook, closeBookDetail, handleDismiss } =
    useBookDetailBottomSheet();

  const snapPoints = useMemo(() => ['92%'], []);

  const renderBackDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackDrop}
      onDismiss={handleDismiss}
      // backgroundStyle={styles.background}
      // handleIndicatorStyle={styles.handle}
    >
      {/* <BottomSheetScrollView contentContainerStyle={styles.scrollContent}> */}
      <BottomSheetScrollView>
        {selectedBook && (
          <View className="px-6 pb-8">
            {/* Header avec bouton Fermer */}
            <View className="flex-row justify-end mb-4">
              <TouchableOpacity onPress={closeBookDetail}>
                <Ionicons
                  name="close-circle-outline"
                  size={28}
                  color="#64748b"
                />
              </TouchableOpacity>
            </View>

            {/* Couverture */}
            {selectedBook.coverUrl && (
              <Image
                source={{ uri: selectedBook.coverUrl }}
                style={{ width: 150, height: 220, alignSelf: 'center' }}
                resizeMode="contain"
              />
            )}

            {/* Titre + Auteur */}
            <Text className="text-xl font-bold text-gray-800 mt-4 text-center">
              {selectedBook.title}
            </Text>
            <Text className="text-gray-500 text-center mt-1">
              {selectedBook.author}
            </Text>

            {/* Métadonnées (éditeur, pages, langue, date) */}
            {/* ... champs affichés conditionnellement selon leur existence ... */}

            {/* Description */}
            {selectedBook.description && (
              <Text className="text-gray-600 mt-4 leading-5">
                {selectedBook.description}
              </Text>
            )}

            {/* Catégories */}
            {selectedBook.categories.length > 0 && (
              <View className="flex-row flex-wrap gap-2 mt-4">
                {selectedBook.categories.map((cat, i) => (
                  <View key={i} className="bg-blue-100 rounded-full px-3 py-1">
                    <Text className="text-blue-800 text-xs">{cat}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

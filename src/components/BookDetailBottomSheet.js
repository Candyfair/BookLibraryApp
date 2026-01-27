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
  const {
    bottomSheetRef,
    selectedBook,
    fallbackResults,
    closeBookDetail,
    handleDismiss,
    openBookDetail,
  } = useBookDetailBottomSheet();

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

            {/* Résultats alternatifs (fallback recherche par titre) */}
            {fallbackResults.length > 0 && (
              <View className="mt-6 pt-6 border-t border-gray-200">
                <Text className="text-base font-semibold text-gray-800 mb-3">
                  Autres résultats pour « {selectedBook.title} »
                </Text>
                {fallbackResults.map((book, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => openBookDetail(book)}
                    className="mb-3 flex-row gap-3"
                  >
                    {book.coverUrl ? (
                      <Image
                        source={{ uri: book.coverUrl }}
                        style={{ width: 60, height: 88 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <View
                        className="bg-gray-200 items-center justify-center"
                        style={{ width: 60, height: 88 }}
                      >
                        <Ionicons
                          name="book-outline"
                          size={24}
                          color="#94a3b8"
                        />
                      </View>
                    )}
                    <View className="flex-1 justify-center">
                      <Text
                        className="font-semibold text-gray-800"
                        numberOfLines={2}
                      >
                        {book.title}
                      </Text>
                      <Text className="text-gray-500 text-sm" numberOfLines={1}>
                        {book.author}
                      </Text>
                      {book.description && (
                        <Text
                          className="text-gray-400 text-xs mt-1"
                          numberOfLines={2}
                        >
                          {book.description}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

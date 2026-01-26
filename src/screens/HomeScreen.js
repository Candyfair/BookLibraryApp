import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Context
import { useBookDetailBottomSheet } from '../contexts/BookDetailBottomSheetContext';

// Composants
import Header from '../components/Header';
import { searchByQuery } from '../services/BookService';

/**
 * Home Screen - Point d'entrée principal de l'application
 *
 * Fonctionnalités :
 * - Recherche textuelle par titre/auteur/ISBN
 * - Bouton pour scanner un code-barre ISBN
 *
 * Architecture :
 * - Utilise nativewind pour le styling (classes Tailwind)
 * - État local pour la recherche
 * - Prêt pour l'intégration avec BookService
 */
export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const RESULTS_PER_PAGE = 20;

  const { openBookDetail } = useBookDetailBottomSheet();

  /**
   * Gère la soumission de la recherche
   * TODO: Intégrer avec BookService pour rechercher dans Google Books / OpenLibrary
   */
  const handleSearch = async () => {
    setSearched(true);
    setIsLoading(true);
    setError(null);
    setBookList([]);
    setHasMore(false);

    if (searchQuery.trim()) {
      try {
        const result = await searchByQuery(searchQuery, RESULTS_PER_PAGE, 0);

        if (result.items.length > 0) {
          setBookList(result.items);
          setHasMore(result.hasMore);
        } else {
          setError('Aucun livre trouvé dans les bases de données');
        }
      } catch (err) {
        setError('Erreur lors de la recherche. Vérifiez votre connexion.');
        console.error('Erreur API: ', err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const result = await searchByQuery(
        searchQuery,
        RESULTS_PER_PAGE,
        bookList.length
      );

      if (result.items.length > 0) {
        setBookList((prev) => [...prev, ...result.items]);
        setHasMore(result.hasMore);
      }
    } catch (err) {
      console.error('Erreur lors du chargement:', err.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  /**
   * Ouvre le scanner de code-barre
   */
  const handleScanPress = () => {
    console.log('Ouverture du scanner');
    navigation.navigate('Scan');
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <Header />

      <View className="flex-1 flex-col justify-between p-6">
        {/* Section de recherche - En haut */}
        <View>
          {/* Barre de recherche */}
          <View className="flex-row items-center bg-gray-200 rounded-lg px-4 py-3 mb-4">
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-800"
              placeholder="Cherchez un livre"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row gap-3">
            {/* Bouton Scanner */}
            <TouchableOpacity
              onPress={handleScanPress}
              className="flex-1 bg-indigo-500 rounded-lg py-3.5 flex-row items-center justify-center"
              activeOpacity={0.8}
            >
              <Ionicons name="barcode-outline" size={20} color="#fff" />
              <Text className="text-white font-semibold ml-2">
                ou scannez un code barre
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Affichage des résultats */}
        {searched && (
          <>
            <ScrollView
              className="flex-1 mt-4"
              showsVerticalScrollIndicator={false}
            >
              {isLoading ? (
                <View className="bg-gray-800 rounded-lg py-4 items-center">
                  <Text className="text-white">Recherche en cours...</Text>
                </View>
              ) : error ? (
                <View className="bg-red-500 rounded-lg py-3 px-4 mb-3">
                  <Text className="text-white">{error}</Text>
                </View>
              ) : bookList.length > 0 ? (
                <View>
                  {bookList.map((book, i) => {
                    return (
                      <View className="mb-3 flex flex-row gap-3" key={i}>
                        {book.coverUrl ? (
                          <Image
                            source={{ uri: book.coverUrl }}
                            style={{ width: 100, height: 138 }}
                          />
                        ) : (
                          <View
                            className="bg-gray-300"
                            style={{ width: 100, height: 138 }}
                          />
                        )}
                        <View className="flex-1 flex-col">
                          <Text className="font-semibold" numberOfLines={2}>
                            {book.title}
                          </Text>
                          <Text className="text-gray-600" numberOfLines={1}>
                            {book.author}
                          </Text>
                          <Text
                            className="text-gray-500 text-sm mt-1"
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {book.description}
                          </Text>

                          {/* Boutons d'actions */}
                          <View className="flex-row gap-2 mt-2">
                            <TouchableOpacity
                              onPress={() => openBookDetail(book)}
                              className="flex-1 bg-blue-500 rounded-lg py-2 items-center"
                            >
                              <Text className="text-white text-sm font-semibold">
                                Détails
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex-1 bg-blue-500 rounded-lg py-2 items-center">
                              <Text className="text-white text-sm font-semibold">
                                Ajouter
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}

                  {hasMore && (
                    <TouchableOpacity
                      onPress={handleLoadMore}
                      className="bg-gray-200 rounded-lg py-3 items-center mb-4"
                      activeOpacity={0.8}
                      disabled={isLoadingMore}
                    >
                      <Text className="text-gray-700 font-semibold">
                        {isLoadingMore ? 'Chargement...' : 'Charger plus'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}
            </ScrollView>
          </>
        )}

        {/* Titre de l'application - En bas */}
        <View className="items-start">
          <Text className="text-2xl">Ma bibliothèque</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

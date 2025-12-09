import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Composants
import Header from '../components/Header';

/**
 * Library Screen - Affiche la collection de livres de l'utilisateur
 *
 * Fonctionnalités :
 * - Grille optimisée de livres (FlatList avec numColumns)
 * - Filtres par statut (Wishlist, Prêtés, Empruntés)
 * - Filtres par genre (à implémenter avec les données SQLite)
 * - Compteur de livres
 *
 * Architecture :
 * - FlatList pour performance (recyclage des vues)
 * - État local pour les filtres
 * - Prêt pour l'intégration avec BookService + SQLite
 */
export default function LibraryScreen({ navigation }) {
  // État pour le filtre de statut actif
  const [activeStatus, setActiveStatus] = useState(null);
  const [activeGenre, setActiveGenres] = useState('all');
  const [bookmarks, setBookmarks] = useState(false);

  // Données de test - À remplacer par les vrais livres depuis SQLite
  const [books, setBooks] = useState([]);

  // Filtres de genres disponibles
  const genres = [
    { id: 'all', label: 'Tout voir' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'police', label: 'Policier' },
    { id: 'art', label: 'Art' },
    { id: 'scifi', label: 'Science-fiction' },
    { id: 'thriller', label: 'Thriller' },
    { id: 'essay', label: 'Essai' },
    { id: 'psycho', label: 'Psychologie' },
  ];

  // Filtres de statut disponibles
  const filters = [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'lent', label: 'Prêtés' },
    { id: 'borrowed', label: 'Empruntés' },
  ];

  /**
   * Rendu d'une carte livre dans la grille
   * TODO: Remplacer par un vrai composant BookCard
   */
  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      className="flex-1 m-2 bg-white rounded-lg shadow-sm overflow-hidden"
      activeOpacity={0.8}
      // TODO: Navigation vers BookDetailScreen
      onPress={() => console.log('Livre sélectionné:', item.id)}
    >
      {/* Image de couverture - Placeholder */}
      <View className="aspect-[2/3] bg-gray-200 items-center justify-center">
        <Ionicons name="book" size={48} color="#cbd5e1" />
      </View>

      {/* Infos livre */}
      <View className="p-3">
        <Text className="font-semibold text-gray-800 text-sm" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="text-gray-500 text-xs mt-1" numberOfLines={1}>
          {item.author}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /**
   * Affiche le placeholder quand la bibliothèque est vide
   */
  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center p-8">
      <Ionicons name="book-outline" size={80} color="#cbd5e1" />
      <Text className="text-xl font-semibold text-gray-700 mt-6">
        Bibliothèque vide
      </Text>
      <Text className="text-gray-500 text-center mt-2">
        Ajoutez des livres depuis l'écran d'accueil
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Scanner un livre')}
        className="mt-6 bg-blue-500 px-6 py-3 rounded-lg flex-row items-center"
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text className="text-white font-semibold ml-2">Ajouter un livre</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <Header />

      {/* Barres de filtres horizontale*/}
      <View className="mb-8">
        {/* Filtres de genres */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 py-2"
        >
          {genres.map(genre => {
            const isActiveGenre = activeGenre === genre.id;
            return (
              <Pressable
                key={genre.id}
                onPress={() => setActiveGenres(genre.id)}
                className={`mr-3 flex-row items-center`}
              >
                <Text
                  className={`ml-2 font-semibold text-gray-700 ${
                    isActiveGenre ? 'bg-yellow-400 rounded-full px-4 py-2' : ''
                  }`}
                >
                  {genre.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Filtres de statuts */}
        <View className="flex flex-row justify-between items-center px-4 py-2">
          <View className="flex flex-row justify-start items-center">
            <View className="flex flex-row justify-start">
              {filters.map(filter => {
                const isActiveStatus = activeStatus === filter.id;
                return (
                  <Pressable
                    key={filter.id}
                    onPress={() => setActiveStatus(filter.id)}
                    className={`ml-2 mr-3 flex-row items-center`}
                  >
                    <View
                      className={`${isActiveStatus ? 'border-b-2 border-yellow-400' : ''}`}
                    >
                      <Text className="font-semibold text-gray-700">
                        {filter.label}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {/* Bouton favoris */}
            <Pressable onPress={() => setBookmarks(!bookmarks)}>
              <Ionicons
                name={bookmarks ? 'heart-sharp' : 'heart-outline'}
                size={24}
                color={bookmarks ? '#facc15' : 'black'}
              />
            </Pressable>
          </View>

          {/* Bouton tri / options (à implémenter) */}
          <Pressable className="flex-row items-center">
            <Ionicons name="swap-vertical" size={18} color="#64748b" />
            <Text className="text-gray-600 ml-2 text-sm">Trier</Text>
          </Pressable>
        </View>
      </View>

      {/* Grille de livres */}
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{
          padding: 8,
          flexGrow: 1,
        }}
        ListEmptyComponent={renderEmptyState}
        // Optimisations FlatList
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
      />

      {/* Bouton flottant "Ajouter" (visible uniquement si livres présents) */}
      {books.length > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Scanner un livre')}
          className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

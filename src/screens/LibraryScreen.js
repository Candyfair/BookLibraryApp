import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

/**
 * Library Screen - Affiche la collection de livres de l'utilisateur
 *
 * Fonctionnalités :
 * - Grille optimisée de livres (FlatList avec numColumns)
 * - Filtres par statut (Tous, Lus, À lire, Wishlist, Prêtés, Empruntés)
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
  const [activeFilter, setActiveFilter] = useState('all');

  // Données de test - À remplacer par les vrais livres depuis SQLite
  const [books, setBooks] = useState([]);

  // Filtres de statut disponibles
  const filters = [
    { id: 'all', label: 'Tous', icon: 'library' },
    { id: 'read', label: 'Lus', icon: 'checkmark-circle' },
    { id: 'reading', label: 'En cours', icon: 'book' },
    { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
    { id: 'lent', label: 'Prêtés', icon: 'arrow-forward-circle' },
    { id: 'borrowed', label: 'Empruntés', icon: 'arrow-back-circle' },
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
    <View className="flex-1 bg-gray-50">
      {/* Barre de filtres horizontale */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-gray-200"
        contentContainerClassName="px-4 py-3"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setActiveFilter(filter.id)}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                isActive ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              activeOpacity={0.7}
            >
              <Ionicons
                name={filter.icon}
                size={16}
                color={isActive ? '#fff' : '#64748b'}
              />
              <Text
                className={`ml-2 font-semibold ${
                  isActive ? 'text-white' : 'text-gray-700'
                }`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Compteur et options */}
      <View className="bg-white px-6 py-3 flex-row items-center justify-between border-b border-gray-200">
        <Text className="text-gray-600">
          <Text className="font-bold text-gray-800">{books.length}</Text> livre
          {books.length > 1 ? 's' : ''}
        </Text>

        {/* Bouton tri / options (à implémenter) */}
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="swap-vertical" size={18} color="#64748b" />
          <Text className="text-gray-600 ml-2 text-sm">Trier</Text>
        </TouchableOpacity>
      </View>

      {/* Grille de livres */}
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
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
    </View>
  );
}

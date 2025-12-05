/**
 * Écran Fiche Livre Détaillée (Route dynamique)
 *
 * Affiche toutes les informations d'un livre :
 * - Données API (titre, auteur, couverture, description...)
 * - Champs personnalisés (notes, statut, prêt/emprunt, favoris)
 * - Actions (éditer, supprimer, partager)
 *
 * Route : /book/[id]
 * Paramètre : id (ISBN ou ID local)
 *
 * TODO: Charger les données réelles depuis SQLite
 */

import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BookDetailScreen() {
  // Récupération de l'ID du livre depuis l'URL
  const { id } = useLocalSearchParams();

  // TODO: Charger les données du livre depuis BookService
  // const book = useBook(id);

  // Données fictives pour le moment
  const book = {
    id: id,
    title: 'Exemple de Livre',
    author: 'Auteur Inconnu',
    isbn: id,
    coverUrl: null,
    description: 'Description non disponible pour le moment.',
    pageCount: 0,
    publishedDate: 'Date inconnue',
    genres: [],
    isRead: false,
    isFavorite: false,
    isWishlist: false,
    notes: '',
  };

  const handleToggleFavorite = () => {
    console.log('Toggle favorite');
  };

  const handleToggleRead = () => {
    console.log('Toggle read status');
  };

  const handleEdit = () => {
    console.log('Edit book');
  };

  const handleDelete = () => {
    console.log('Delete book');
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        {/* Couverture et infos principales */}
        <View className="items-center mb-6">
          {/* Couverture du livre */}
          <View className="w-40 h-60 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 items-center justify-center shadow-lg">
            {book.coverUrl ? (
              <Image
                source={{ uri: book.coverUrl }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="book" size={60} color="#9ca3af" />
            )}
          </View>

          {/* Titre et auteur */}
          <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2 px-4">
            {book.title}
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-1">
            {book.author}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-500">
            ISBN: {book.isbn}
          </Text>
        </View>

        {/* Actions rapides */}
        <View className="flex-row justify-center mb-6 space-x-3">
          {/* Favori */}
          <Pressable
            onPress={handleToggleFavorite}
            className={`w-14 h-14 rounded-full items-center justify-center ${
              book.isFavorite
                ? 'bg-red-500'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <Ionicons
              name={book.isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={book.isFavorite ? 'white' : '#9ca3af'}
            />
          </Pressable>

          {/* Lu */}
          <Pressable
            onPress={handleToggleRead}
            className={`w-14 h-14 rounded-full items-center justify-center ${
              book.isRead
                ? 'bg-green-500'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <Ionicons
              name={book.isRead ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={24}
              color={book.isRead ? 'white' : '#9ca3af'}
            />
          </Pressable>

          {/* Partager */}
          <Pressable className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center">
            <Ionicons name="share-outline" size={24} color="#9ca3af" />
          </Pressable>

          {/* Éditer */}
          <Pressable
            onPress={handleEdit}
            className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center"
          >
            <Ionicons name="create-outline" size={24} color="#9ca3af" />
          </Pressable>
        </View>

        {/* Informations détaillées */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-4">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Informations
          </Text>

          {/* Pages */}
          <View className="flex-row items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Pages
            </Text>
            <Text className="text-sm font-medium text-gray-900 dark:text-white">
              {book.pageCount || 'N/A'}
            </Text>
          </View>

          {/* Date de publication */}
          <View className="flex-row items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Date de publication
            </Text>
            <Text className="text-sm font-medium text-gray-900 dark:text-white">
              {book.publishedDate}
            </Text>
          </View>

          {/* Genres */}
          <View className="flex-row items-center justify-between py-3">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Genres
            </Text>
            <Text className="text-sm font-medium text-gray-900 dark:text-white">
              {book.genres.length > 0 ? book.genres.join(', ') : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-4">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Description
          </Text>
          <Text className="text-sm text-gray-700 dark:text-gray-300 leading-6">
            {book.description}
          </Text>
        </View>

        {/* Notes personnelles */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-4">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Mes notes
          </Text>
          {book.notes ? (
            <Text className="text-sm text-gray-700 dark:text-gray-300 leading-6">
              {book.notes}
            </Text>
          ) : (
            <Text className="text-sm text-gray-500 dark:text-gray-500 italic">
              Aucune note pour le moment
            </Text>
          )}
        </View>

        {/* Bouton supprimer */}
        <Pressable
          onPress={handleDelete}
          className="flex-row items-center justify-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl py-4 active:bg-red-100"
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
          <Text className="text-red-500 font-semibold text-base ml-2">
            Supprimer ce livre
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

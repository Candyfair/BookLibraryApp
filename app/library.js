/**
 * Écran Bibliothèque
 *
 * Affiche la grille de livres avec :
 * - Filtres (genres, statuts)
 * - Grille optimisée FlatList
 * - Navigation vers les fiches détaillées
 *
 * TODO: Implémenter la grille avec données réelles
 */

import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LibraryScreen() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        {/* Header avec filtres (à implémenter) */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ma Bibliothèque
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            0 livres au total
          </Text>
        </View>

        {/* État vide */}
        <View className="items-center justify-center py-20">
          <View className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-4">
            <Ionicons name="book-outline" size={40} color="#9ca3af" />
          </View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Aucun livre pour le moment
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 text-center px-8">
            Commencez par scanner un ISBN ou rechercher un livre
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

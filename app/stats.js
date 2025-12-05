/**
 * Écran Statistiques
 *
 * Affiche les statistiques de lecture :
 * - Total de livres
 * - Livres lus / en cours / wishlist
 * - Répartition par genres
 * - Prêts et emprunts
 *
 * TODO: Implémenter les statistiques réelles
 */

import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Mes Statistiques
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Vue d'ensemble de votre bibliothèque
          </Text>
        </View>

        {/* Statistiques principales */}
        <View className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 mb-4">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center">
              <Ionicons name="library" size={20} color="white" />
            </View>
            <Text className="text-base font-semibold text-gray-900 dark:text-white ml-3">
              Total de livres
            </Text>
          </View>
          <Text className="text-4xl font-bold text-blue-500">0</Text>
        </View>

        {/* Grille de stats */}
        <View className="flex-row flex-wrap -mx-2 mb-4">
          {/* Livres lus */}
          <View className="w-1/2 px-2 mb-4">
            <View className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              <Text className="text-2xl font-bold text-green-500 mt-2">0</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Livres lus
              </Text>
            </View>
          </View>

          {/* En cours */}
          <View className="w-1/2 px-2 mb-4">
            <View className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
              <Ionicons name="book" size={24} color="#a855f7" />
              <Text className="text-2xl font-bold text-purple-500 mt-2">0</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                En cours
              </Text>
            </View>
          </View>

          {/* Wishlist */}
          <View className="w-1/2 px-2 mb-4">
            <View className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
              <Ionicons name="heart" size={24} color="#f97316" />
              <Text className="text-2xl font-bold text-orange-500 mt-2">0</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Wishlist
              </Text>
            </View>
          </View>

          {/* Prêtés */}
          <View className="w-1/2 px-2 mb-4">
            <View className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <Ionicons name="arrow-forward-circle" size={24} color="#ef4444" />
              <Text className="text-2xl font-bold text-red-500 mt-2">0</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Prêtés
              </Text>
            </View>
          </View>
        </View>

        {/* Genres populaires */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-4">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Genres favoris
          </Text>
          <View className="items-center justify-center py-8">
            <Ionicons name="pie-chart-outline" size={40} color="#9ca3af" />
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Aucune donnée disponible
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

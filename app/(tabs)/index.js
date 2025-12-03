/**
 * Écran d'accueil (Index)
 *
 * Premier écran de l'application :
 * - Recherche textuelle de livres
 * - Bouton de scan ISBN
 * - Liens rapides vers les sections principales
 *
 * TODO: Implémenter la recherche et le scan
 */

import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bienvenue
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400">
            Gérez votre bibliothèque personnelle
          </Text>
        </View>

        {/* Barre de recherche */}
        <View className="mb-6">
          <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              placeholder="Rechercher un livre..."
              placeholderTextColor="#9ca3af"
              className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
            />
          </View>
        </View>

        {/* Bouton Scanner */}
        <Pressable
          onPress={() => router.push('/scan')}
          className="flex-row items-center justify-center bg-blue-500 rounded-xl py-4 mb-8 active:bg-blue-600"
        >
          <Ionicons name="barcode-outline" size={24} color="white" />
          <Text className="text-white font-semibold text-lg ml-3">
            Scanner un ISBN
          </Text>
        </Pressable>

        {/* Actions rapides */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Actions rapides
          </Text>

          {/* Grille d'actions */}
          <View className="flex-row flex-wrap -mx-2">
            {/* Bibliothèque */}
            <View className="w-1/2 px-2 mb-4">
              <Pressable
                onPress={() => router.push('/library')}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 items-center active:opacity-70"
              >
                <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mb-3">
                  <Ionicons name="library" size={24} color="white" />
                </View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  Ma Bibliothèque
                </Text>
              </Pressable>
            </View>

            {/* Statistiques */}
            <View className="w-1/2 px-2 mb-4">
              <Pressable
                onPress={() => router.push('/stats')}
                className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 items-center active:opacity-70"
              >
                <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center mb-3">
                  <Ionicons name="stats-chart" size={24} color="white" />
                </View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  Statistiques
                </Text>
              </Pressable>
            </View>

            {/* Livres lus */}
            <View className="w-1/2 px-2 mb-4">
              <Pressable className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 items-center active:opacity-70">
                <View className="w-12 h-12 bg-purple-500 rounded-full items-center justify-center mb-3">
                  <Ionicons name="checkmark-circle" size={24} color="white" />
                </View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  Livres lus
                </Text>
              </Pressable>
            </View>

            {/* Wishlist */}
            <View className="w-1/2 px-2 mb-4">
              <Pressable className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 items-center active:opacity-70">
                <View className="w-12 h-12 bg-orange-500 rounded-full items-center justify-center mb-3">
                  <Ionicons name="heart" size={24} color="white" />
                </View>
                <Text className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  Wishlist
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Statistiques rapides */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Ma bibliothèque en chiffres
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-500">0</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Livres
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-500">0</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Lus
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-purple-500">0</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                En cours
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-orange-500">0</Text>
              <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Wishlist
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

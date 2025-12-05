import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

/**
 * Composant CustomDrawerContent - Menu latéral personnalisé
 *
 * Fonctionnalités :
 * - Header avec titre et icône
 * - Liste des pages de navigation (automatique via DrawerItemList)
 * - Section statistiques rapides
 * - Footer avec version et liens
 *
 * Architecture :
 * - Utilise DrawerContentScrollView pour le scroll
 * - DrawerItemList pour la navigation automatique
 * - Sections modulaires
 */
export default function CustomDrawerContent(props) {
  // Statistiques fictives - À remplacer par les vraies données SQLite
  const stats = {
    totalBooks: 0,
    readBooks: 0,
    wishlistBooks: 0,
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1 }}
      className="bg-gray-50"
    >
      {/* Header du drawer */}
      <View className="bg-blue-500 p-6 pb-8">
        <View className="flex-row items-center mb-3">
          <View className="bg-white/20 rounded-full p-2">
            <Ionicons name="library" size={32} color="#fff" />
          </View>
          <View className="ml-4">
            <Text className="text-white text-xl font-bold">Ma Bibliothèque</Text>
            <Text className="text-blue-100 text-sm">Organisez vos lectures</Text>
          </View>
        </View>
      </View>

      {/* Section Statistiques rapides */}
      <View className="bg-white m-4 rounded-lg p-4 shadow-sm">
        <Text className="text-gray-600 text-xs font-semibold uppercase mb-3">
          Vue d'ensemble
        </Text>

        <View className="flex-row justify-between">
          {/* Total */}
          <View className="items-center flex-1">
            <Text className="text-xl font-bold text-gray-800">
              {stats.totalBooks}
            </Text>
            <Text className="text-gray-500 text-xs mt-1">Total</Text>
          </View>

          {/* Divider */}
          <View className="w-px bg-gray-200" />

          {/* Lus */}
          <View className="items-center flex-1">
            <Text className="text-xl font-bold text-green-600">
              {stats.readBooks}
            </Text>
            <Text className="text-gray-500 text-xs mt-1">Lus</Text>
          </View>

          {/* Divider */}
          <View className="w-px bg-gray-200" />

          {/* Wishlist */}
          <View className="items-center flex-1">
            <Text className="text-xl font-bold text-red-500">
              {stats.wishlistBooks}
            </Text>
            <Text className="text-gray-500 text-xs mt-1">Wishlist</Text>
          </View>
        </View>
      </View>

      {/* Navigation - Liste automatique des écrans */}
      <View className="flex-1 px-2">
        <Text className="text-gray-600 text-xs font-semibold uppercase px-4 mb-2">
          Navigation
        </Text>
        <DrawerItemList {...props} />
      </View>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Section Liens rapides */}
      <View className="border-t border-gray-200 p-4">
        <TouchableOpacity
          className="flex-row items-center py-3"
          activeOpacity={0.7}
          onPress={() => console.log('Statistiques')}
        >
          <Ionicons name="stats-chart-outline" size={20} color="#64748b" />
          <Text className="ml-3 text-gray-700">Statistiques détaillées</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-3"
          activeOpacity={0.7}
          onPress={() => console.log('Paramètres')}
        >
          <Ionicons name="settings-outline" size={20} color="#64748b" />
          <Text className="ml-3 text-gray-700">Paramètres</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-3"
          activeOpacity={0.7}
          onPress={() => console.log('Aide')}
        >
          <Ionicons name="help-circle-outline" size={20} color="#64748b" />
          <Text className="ml-3 text-gray-700">Aide & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View className="border-t border-gray-200 p-4 bg-gray-100">
        <Text className="text-gray-500 text-xs text-center">
          Book Library App v1.0.0
        </Text>
        <Text className="text-gray-400 text-xs text-center mt-1">
          MVP - Stockage local
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

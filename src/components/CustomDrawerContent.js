import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
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
            <Text className="text-white text-xl font-bold">
              Ma Bibliothèque
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation - Liste automatique des écrans */}
      <View className="flex-1 px-2">
        <DrawerItemList {...props} />
      </View>

      {/* Spacer */}
      <View className="flex-1" />

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

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

/**
 * Composant CustomDrawerContent - Menu latéral personnalisé
 *
 * Fonctionnalités :
 * - Header avec titre
 * - Liste des pages de navigation (automatique via DrawerItemList)
 * - Footer avec version et liens
 *
 * Architecture :
 * - Utilise DrawerContentScrollView pour le scroll
 * - DrawerItemList pour la navigation automatique
 * - Sections modulaires
 */
export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1 }}
      className="bg-gray-50"
    >
      {/* Header du drawer */}
      <View className="p-6 pb-8">
        <Text className="text-2xl font-bold">Ma Bibliothèque</Text>
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

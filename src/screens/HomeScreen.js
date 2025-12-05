import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

/**
 * Home Screen - Point d'entrée principal de l'application
 *
 * Fonctionnalités :
 * - Recherche textuelle par titre/auteur/ISBN
 * - Bouton pour scanner un code-barre ISBN
 * - Liste des derniers livres ajoutés (à implémenter avec SQLite)
 *
 * Architecture :
 * - Utilise nativewind pour le styling (classes Tailwind)
 * - État local pour la recherche
 * - Prêt pour l'intégration avec BookService
 */
export default function HomeScreen({ navigation }) {
  // État pour le champ de recherche
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Gère la soumission de la recherche
   * TODO: Intégrer avec BookService pour rechercher dans Google Books / OpenLibrary
   */
  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Recherche :', searchQuery);
      // TODO: Navigation vers résultats ou appel API
    }
  };

  /**
   * Ouvre le scanner de code-barre
   * TODO: Navigation vers ScanScreen avec expo-barcode-scanner
   */
  const handleScanPress = () => {
    console.log('Ouverture du scanner');
    // TODO: navigation.navigate('Scan')
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Section de recherche */}
      <View className="bg-white p-6 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Bienvenue dans votre bibliothèque
        </Text>
        <Text className="text-gray-600 mb-6">
          Recherchez ou scannez un livre pour l'ajouter
        </Text>

        {/* Barre de recherche */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder="Titre, auteur ou ISBN..."
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

        {/* Boutons d'action */}
        <View className="flex-row gap-3">
          {/* Bouton Rechercher */}
          <TouchableOpacity
            onPress={handleSearch}
            className="flex-1 bg-blue-500 rounded-lg py-3.5 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <Ionicons name="search" size={20} color="#fff" />
            <Text className="text-white font-semibold ml-2">Rechercher</Text>
          </TouchableOpacity>

          {/* Bouton Scanner */}
          <TouchableOpacity
            onPress={handleScanPress}
            className="flex-1 bg-indigo-500 rounded-lg py-3.5 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <Ionicons name="barcode-outline" size={20} color="#fff" />
            <Text className="text-white font-semibold ml-2">Scanner</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section "Derniers ajouts" - Placeholder */}
      <View className="p-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Derniers ajouts
        </Text>

        {/* Placeholder - À remplacer par les vrais livres depuis SQLite */}
        <View className="bg-white rounded-lg p-6 items-center">
          <Ionicons name="book-outline" size={48} color="#cbd5e1" />
          <Text className="text-gray-500 mt-4 text-center">
            Aucun livre dans votre bibliothèque
          </Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            Commencez par rechercher ou scanner un livre
          </Text>
        </View>
      </View>

      {/* Section "Accès rapide" */}
      <View className="px-6 pb-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Accès rapide
        </Text>

        {/* Carte Bibliothèque */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Voir mes livres')}
          className="bg-white rounded-lg p-4 mb-3 flex-row items-center shadow-sm"
          activeOpacity={0.7}
        >
          <View className="bg-blue-100 rounded-full p-3">
            <Ionicons name="library" size={24} color="#3b82f6" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-semibold text-gray-800">
              Ma bibliothèque
            </Text>
            <Text className="text-sm text-gray-500 mt-0.5">
              Voir tous mes livres
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        {/* Carte Statistiques (placeholder) */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 flex-row items-center shadow-sm"
          activeOpacity={0.7}
        >
          <View className="bg-green-100 rounded-full p-3">
            <Ionicons name="stats-chart" size={24} color="#22c55e" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-semibold text-gray-800">
              Statistiques
            </Text>
            <Text className="text-sm text-gray-500 mt-0.5">
              Suivez vos lectures
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

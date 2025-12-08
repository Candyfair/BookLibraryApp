import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

/**
 * Home Screen - Point d'entrée principal de l'application
 *
 * Fonctionnalités :
 * - Recherche textuelle par titre/auteur/ISBN
 * - Bouton pour scanner un code-barre ISBN
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
    <SafeAreaView className="flex-1">
      {/* Header */}
      <Header />

      <View className="flex-1 flex-col justify-between p-6">
        {/* Section de recherche - En haut */}
        <View>
          {/* Barre de recherche */}
          <View className="flex-row items-center bg-gray-200 rounded-lg px-4 py-3 mb-4">
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-800"
              placeholder="Cherchez un livre"
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

          <View className="flex-row gap-3">
            {/* Bouton Scanner */}
            <TouchableOpacity
              onPress={handleScanPress}
              className="flex-1 bg-indigo-500 rounded-lg py-3.5 flex-row items-center justify-center"
              activeOpacity={0.8}
            >
              <Ionicons name="barcode-outline" size={20} color="#fff" />
              <Text className="text-white font-semibold ml-2">
                ou scannez un code barre
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Titre de l'application - En bas */}
        <View className="items-start">
          <Text className="text-2xl">Ma bibliothèque</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

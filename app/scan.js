/**
 * Écran de Scan ISBN (Modal)
 *
 * Permet de scanner un code-barres ISBN avec la caméra :
 * - Utilise expo-barcode-scanner
 * - Overlay UI avec instructions
 * - Détection automatique du code-barres
 * - Redirection vers la fiche livre ou création
 *
 * TODO: Implémenter le scan réel avec expo-barcode-scanner
 */

import { View, Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ScanScreen() {
  // TODO: Intégrer expo-barcode-scanner
  // const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);
    Alert.alert(
      'Code-barres détecté',
      `Type: ${type}\nISBN: ${data}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // TODO: Rechercher le livre via BookService
            // router.push(`/book/${data}`);
            router.back();
          },
        },
      ]
    );
  };

  const handleManualEntry = () => {
    Alert.alert('Saisie manuelle', 'Fonctionnalité à implémenter');
  };

  return (
    <View className="flex-1 bg-black">
      {/* Zone de scan (placeholder) */}
      <View className="flex-1 items-center justify-center">
        {/* TODO: Remplacer par <CameraView /> avec expo-barcode-scanner */}
        <View className="w-64 h-64 border-4 border-white rounded-2xl items-center justify-center">
          <Ionicons name="scan" size={80} color="white" />
          <Text className="text-white text-center mt-4 px-6">
            Positionnez le code-barres ISBN dans le cadre
          </Text>
        </View>
      </View>

      {/* Overlay infos et actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-black/80 p-6">
        {/* Instructions */}
        <View className="bg-white/10 rounded-xl p-4 mb-4">
          <Text className="text-white text-sm text-center leading-5">
            Alignez le code-barres ISBN avec le cadre blanc pour le scanner automatiquement
          </Text>
        </View>

        {/* Bouton saisie manuelle */}
        <Pressable
          onPress={handleManualEntry}
          className="flex-row items-center justify-center bg-white rounded-xl py-4 active:bg-gray-100"
        >
          <Ionicons name="create" size={20} color="#111827" />
          <Text className="text-gray-900 font-semibold text-base ml-2">
            Saisir l'ISBN manuellement
          </Text>
        </Pressable>

        {/* Info permission */}
        <Text className="text-white/60 text-xs text-center mt-4">
          L'accès à la caméra est nécessaire pour scanner les codes-barres
        </Text>
      </View>
    </View>
  );
}

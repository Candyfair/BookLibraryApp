import { Text, View, Pressable, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedISBN, setScannedISBN] = useState(null);

  // Gestion du scan de code-barres
  const handleBarcodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    setScannedISBN(data);
    // TODO: Appeler BookService avec l'ISBN
    // navigation.navigate('BookDetail', { isbn: data });
  };

  // Réinitialiser le scan
  const handleScanAgain = () => {
    setScanned(false);
    setScannedISBN(null);
  };

  // État de chargement initial
  if (!permission) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
        <Ionicons name="camera-outline" size={48} color="#94a3b8" />
        <Text className="text-gray-400 mt-4">Chargement de la caméra...</Text>
      </SafeAreaView>
    );
  }

  // Écran de demande de permission
  // TODO: Tester l'affichage de cet écran
  //
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center px-8">
        {/* Bouton retour */}
        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute top-16 left-6"
        >
          <Ionicons name="arrow-back" size={28} color="#1e293b" />
        </Pressable>

        {/* Icône centrale */}
        <View className="bg-indigo-100 rounded-full p-6 mb-6">
          <Ionicons name="camera" size={64} color="#6366f1" />
        </View>

        {/* Titre */}
        <Text className="text-2xl font-bold text-gray-800 text-center mb-3">
          Accès à la caméra requis
        </Text>

        {/* Description */}
        <Text className="text-gray-500 text-center text-base mb-8 leading-6">
          Pour scanner les codes-barres de vos livres et les ajouter
          automatiquement à votre bibliothèque, nous avons besoin d{"'"}accéder
          à votre caméra.
        </Text>

        {/* Bouton autoriser */}
        <Pressable
          onPress={requestPermission}
          className="bg-indigo-500 rounded-lg py-4 px-8 flex-row items-center"
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text className="text-white font-semibold text-lg ml-2">
            Autoriser l{"'"}accès
          </Text>
        </Pressable>

        {/* Lien annuler */}
        <Pressable onPress={() => navigation.goBack()} className="mt-4 py-2">
          <Text className="text-gray-500">Annuler</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // Écran de scan avec caméra
  return (
    <View className="flex-1 bg-black">
      {/* Caméra en arrière-plan */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      {/* Overlay UI en position absolue par-dessus la caméra */}
      <View style={StyleSheet.absoluteFillObject}>
        {/* Header avec bouton retour */}
        <SafeAreaView className="px-4 pt-2">
          <Pressable
            onPress={() => navigation.goBack()}
            className="bg-black/50 rounded-full p-2 self-start"
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
        </SafeAreaView>

        {/* Zone centrale de scan */}
        <View className="flex-1 justify-center items-center">
          {/* Texte d'instruction */}
          <Text className="text-white text-lg font-medium mb-6 text-center px-4">
            Placez le code-barres dans le cadre
          </Text>

          {/* Cadre de scan */}
          <View className="relative">
            {/* Zone de scan transparente avec bordures */}
            <View className="w-72 h-40 border-2 border-white/70 rounded-lg">
              {/* Coins décoratifs */}
              <View className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-indigo-400 rounded-tl-lg" />
              <View className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-indigo-400 rounded-tr-lg" />
              <View className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-indigo-400 rounded-bl-lg" />
              <View className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-indigo-400 rounded-br-lg" />

              {/* Ligne de scan */}
              <View className="absolute top-1/2 left-2 right-2 h-0.5 bg-indigo-400/80" />
            </View>
          </View>

          {/* Texte secondaire */}
          <Text className="text-gray-300 text-sm mt-6 text-center px-8">
            Le code ISBN se trouve généralement au dos du livre
          </Text>
        </View>

        {/* Footer - Message de confirmation et bouton */}
        <SafeAreaView className="pb-6">
          {scanned && scannedISBN && (
            <View className="mx-6">
              {/* Message de confirmation */}
              <View className="bg-green-500 rounded-lg py-3 px-4 mb-3 flex-row items-center">
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
                <View className="ml-3 flex-1">
                  <Text className="text-white font-semibold">
                    Code-barres détecté
                  </Text>
                  <Text className="text-white/80 text-sm">
                    ISBN : {scannedISBN}
                  </Text>
                </View>
              </View>

              {/* Bouton scanner à nouveau */}
              <Pressable
                onPress={handleScanAgain}
                className="bg-indigo-500 rounded-lg py-3 items-center"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-white font-semibold">
                  Scanner à nouveau
                </Text>
              </Pressable>
            </View>
          )}
        </SafeAreaView>
      </View>
    </View>
  );
}

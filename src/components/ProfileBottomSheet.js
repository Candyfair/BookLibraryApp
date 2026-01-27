import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useMemo, useCallback } from 'react';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useProfileBottomSheet } from '../contexts/ProfileBottomSheetContext';

/**
 * ProfileBottomSheet - Bottom sheet pour Login et Profil utilisateur
 *
 * Réutilise la logique de ProfileScreen.js dans une bottom sheet
 * Accessible depuis n'importe quel écran via useProfileBottomSheet()
 */
export default function ProfileBottomSheet() {
  const { bottomSheetRef, closeBottomSheet, handleDismiss } =
    useProfileBottomSheet();
  const [user, setUser] = useState(null);

  // Points d'arrêt de la bottom sheet (en % de la hauteur d'écran)
  // '92%' laisse visible uniquement le header avec les icônes
  const snapPoints = useMemo(() => ['92%'], []);

  // Backdrop personnalisé (overlay semi-transparent)
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  /**
   * Gère la connexion avec Google
   * TODO: Intégrer avec AuthService
   */
  const handleGoogleLogin = useCallback(async () => {
    try {
      console.log('Connexion Google...');
      Alert.alert('Info', 'Connexion Google à implémenter');
    } catch (error) {
      console.error('Erreur connexion Google:', error);
      Alert.alert('Erreur', 'Impossible de se connecter avec Google');
    }
  }, []);

  /**
   * Gère la connexion avec Apple
   * TODO: Intégrer avec AuthService
   */
  const handleAppleLogin = useCallback(async () => {
    try {
      console.log('Connexion Apple...');
      Alert.alert('Info', 'Connexion Apple à implémenter');
    } catch (error) {
      console.error('Erreur connexion Apple:', error);
      Alert.alert('Erreur', 'Impossible de se connecter avec Apple');
    }
  }, []);

  /**
   * Gère la déconnexion
   * TODO: Intégrer avec AuthService
   */
  const handleLogout = useCallback(() => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        style: 'destructive',
        onPress: () => {
          setUser(null);
          console.log('Déconnexion');
        },
      },
    ]);
  }, []);

  const handleSheetChange = useCallback(() => {
    // Callback appelé quand l'index de la bottom sheet change
    // Utile pour tracking ou animations personnalisées
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableDismissOnClose={true}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChange}
      onDismiss={handleDismiss}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      android_keyboardInputMode="adjustResize"
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec bouton fermer */}
        <View className="flex-row justify-between items-center px-6 mb-4">
          <Text className="text-2xl font-bold text-gray-800">
            {user ? 'Mon Profil' : 'Bienvenue !'}
          </Text>
          <TouchableOpacity onPress={closeBottomSheet} activeOpacity={0.7}>
            <Ionicons name="close-circle-outline" size={28} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Mode non connecté */}
        {!user && (
          <View className="px-6 pb-8">
            {/* Icône principale */}
            <View className="bg-blue-100 rounded-full p-6 mb-4 self-center">
              <Ionicons name="person" size={48} color="#3b82f6" />
            </View>

            <Text className="text-gray-600 text-center mb-6">
              Connectez-vous pour synchroniser vos données et profiter de toutes
              les fonctionnalités
            </Text>

            {/* Bouton Google */}
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="w-full bg-white border-2 border-gray-300 rounded-lg py-4 flex-row items-center justify-center mb-4"
              activeOpacity={0.8}
            >
              <Ionicons name="logo-google" size={24} color="#EA4335" />
              <Text className="ml-3 font-semibold text-gray-800">
                Continuer avec Google
              </Text>
            </TouchableOpacity>

            {/* Bouton Apple */}
            <TouchableOpacity
              onPress={handleAppleLogin}
              className="w-full bg-black rounded-lg py-4 flex-row items-center justify-center mb-6"
              activeOpacity={0.8}
            >
              <Ionicons name="logo-apple" size={24} color="#fff" />
              <Text className="ml-3 font-semibold text-white">
                Continuer avec Apple
              </Text>
            </TouchableOpacity>

            {/* Message info */}
            <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 text-sm text-center">
                L'authentification est optionnelle pour le MVP.{'\n'}
                Vos données sont stockées localement.
              </Text>
            </View>
          </View>
        )}

        {/* Mode connecté */}
        {user && (
          <View className="px-6 pb-8">
            {/* Avatar */}
            <View className="items-center mb-6">
              {user.photoURL ? (
                <Image
                  source={{ uri: user.photoURL }}
                  className="w-20 h-20 rounded-full mb-3"
                />
              ) : (
                <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-3">
                  <Text className="text-white text-2xl font-bold">
                    {user.displayName?.charAt(0) || 'U'}
                  </Text>
                </View>
              )}
              <Text className="text-xl font-bold text-gray-800">
                {user.displayName || 'Utilisateur'}
              </Text>
              <Text className="text-gray-500 mt-1">{user.email}</Text>
            </View>

            {/* Statistiques rapides */}
            <View className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <Text className="text-lg font-bold text-gray-800 mb-4">
                Mes statistiques
              </Text>

              <View className="flex-row justify-around">
                {/* Total livres */}
                <View className="items-center">
                  <View className="bg-blue-100 rounded-full p-3 mb-2">
                    <Ionicons name="library" size={24} color="#3b82f6" />
                  </View>
                  <Text className="text-2xl font-bold text-gray-800">0</Text>
                  <Text className="text-gray-500 text-sm">Livres</Text>
                </View>

                {/* Livres lus */}
                <View className="items-center">
                  <View className="bg-green-100 rounded-full p-3 mb-2">
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#22c55e"
                    />
                  </View>
                  <Text className="text-2xl font-bold text-gray-800">0</Text>
                  <Text className="text-gray-500 text-sm">Lus</Text>
                </View>

                {/* Wishlist */}
                <View className="items-center">
                  <View className="bg-red-100 rounded-full p-3 mb-2">
                    <Ionicons name="heart" size={24} color="#ef4444" />
                  </View>
                  <Text className="text-2xl font-bold text-gray-800">0</Text>
                  <Text className="text-gray-500 text-sm">Wishlist</Text>
                </View>
              </View>
            </View>

            {/* Options de paramètres */}
            <View className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
              <Text className="text-lg font-bold text-gray-800 p-4 pb-2">
                Paramètres
              </Text>

              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-gray-100"
                activeOpacity={0.7}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#64748b"
                />
                <Text className="flex-1 ml-4 text-gray-800">Notifications</Text>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-gray-100"
                activeOpacity={0.7}
              >
                <Ionicons name="moon-outline" size={24} color="#64748b" />
                <Text className="flex-1 ml-4 text-gray-800">Thème</Text>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4 border-b border-gray-100"
                activeOpacity={0.7}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={24}
                  color="#64748b"
                />
                <Text className="flex-1 ml-4 text-gray-800">Sauvegarde</Text>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4"
                activeOpacity={0.7}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#64748b"
                />
                <Text className="flex-1 ml-4 text-gray-800">À propos</Text>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>
            </View>

            {/* Bouton Déconnexion */}
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-white rounded-lg p-4 flex-row items-center justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <Ionicons name="log-out-outline" size={24} color="#ef4444" />
              <Text className="ml-3 font-semibold text-red-500">
                Déconnexion
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  bottomSheetBackground: {
    backgroundColor: '#f8fafc',
  },
  handleIndicator: {
    backgroundColor: '#94a3b8',
    width: 40,
  },
});

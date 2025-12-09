import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Composants
import Header from '../components/Header';

/**
 * Profile Screen - Gestion du compte utilisateur et paramètres
 *
 * Fonctionnalités :
 * - Authentification Google & Apple (via Expo AuthSession)
 * - Affichage des informations utilisateur
 * - Statistiques rapides
 * - Options de paramètres
 * - Déconnexion
 *
 * Architecture :
 * - État local pour l'utilisateur (à remplacer par AuthService)
 * - Prêt pour l'intégration Firebase Auth
 * - Design modulaire avec sections
 */
export default function ProfileScreen({ navigation }) {
  // État utilisateur - À remplacer par le contexte AuthService
  const [user, setUser] = useState(null);

  /**
   * Gère la connexion avec Google
   * TODO: Intégrer avec AuthService + Expo AuthSession
   */
  const handleGoogleLogin = async () => {
    try {
      console.log('Connexion Google...');
      // TODO: Implémenter AuthService.loginWithGoogle()
      Alert.alert('Info', 'Connexion Google à implémenter');
    } catch (error) {
      console.error('Erreur connexion Google:', error);
      Alert.alert('Erreur', 'Impossible de se connecter avec Google');
    }
  };

  /**
   * Gère la connexion avec Apple
   * TODO: Intégrer avec AuthService + Expo AuthSession
   */
  const handleAppleLogin = async () => {
    try {
      console.log('Connexion Apple...');
      // TODO: Implémenter AuthService.loginWithApple()
      Alert.alert('Info', 'Connexion Apple à implémenter');
    } catch (error) {
      console.error('Erreur connexion Apple:', error);
      Alert.alert('Erreur', 'Impossible de se connecter avec Apple');
    }
  };

  /**
   * Gère la déconnexion
   * TODO: Intégrer avec AuthService
   */
  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        style: 'destructive',
        onPress: () => {
          setUser(null);
          console.log('Déconnexion');
          // TODO: AuthService.logout()
        },
      },
    ]);
  };

  /**
   * Affiche l'écran de connexion si l'utilisateur n'est pas connecté
   */
  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* Header - Sans bouton profil car déjà sur la page profil */}
        <Header showProfileButton={false} />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center justify-center p-8">
            {/* Icône principale */}
            <View className="bg-blue-100 rounded-full p-6 mb-6">
              <Ionicons name="person" size={64} color="#3b82f6" />
            </View>

            <Text className="text-2xl font-bold text-gray-800 mb-3 text-center">
              Bienvenue !
            </Text>
            <Text className="text-gray-600 text-center mb-8">
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
              className="w-full bg-black rounded-lg py-4 flex-row items-center justify-center mb-8"
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
        </ScrollView>
      </SafeAreaView>
    );
  }

  /**
   * Affiche le profil de l'utilisateur connecté
   */
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header - Sans bouton profil car déjà sur la page profil */}
      <Header showProfileButton={false} />

      <ScrollView className="flex-1 bg-gray-50">
        {/* Header profil */}
        <View className="bg-white p-6 items-center border-b border-gray-200">
          {/* Avatar */}
          {user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              className="w-24 h-24 rounded-full mb-4"
            />
          ) : (
            <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-3xl font-bold">
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
        <View className="bg-white m-4 rounded-lg p-4 shadow-sm">
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
                <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
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
        <View className="bg-white m-4 rounded-lg overflow-hidden shadow-sm">
          <Text className="text-lg font-bold text-gray-800 p-4 pb-2">
            Paramètres
          </Text>

          {/* Option Notifications */}
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-100"
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={24} color="#64748b" />
            <Text className="flex-1 ml-4 text-gray-800">Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Option Thème */}
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-100"
            activeOpacity={0.7}
          >
            <Ionicons name="moon-outline" size={24} color="#64748b" />
            <Text className="flex-1 ml-4 text-gray-800">Thème</Text>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Option Données */}
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-100"
            activeOpacity={0.7}
          >
            <Ionicons name="cloud-upload-outline" size={24} color="#64748b" />
            <Text className="flex-1 ml-4 text-gray-800">Sauvegarde</Text>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Option À propos */}
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
          className="bg-white m-4 rounded-lg p-4 flex-row items-center justify-center shadow-sm"
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text className="ml-3 font-semibold text-red-500">Déconnexion</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text className="text-center text-gray-400 text-sm pb-6">
          Version 1.0.0 (MVP)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

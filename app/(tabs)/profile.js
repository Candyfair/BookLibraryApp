/**
 * Écran Profil
 *
 * Gestion du profil utilisateur :
 * - Authentification Google / Apple
 * - Informations de l'utilisateur
 * - Paramètres de l'application
 * - Déconnexion
 *
 * TODO: Implémenter l'authentification réelle
 */

import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  // État fictif (à remplacer par le vrai AuthContext)
  const isAuthenticated = false;

  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign-In', 'Authentification Google à implémenter');
  };

  const handleAppleSignIn = () => {
    Alert.alert('Apple Sign-In', 'Authentification Apple à implémenter');
  };

  const handleSignOut = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?');
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-6">
        {!isAuthenticated ? (
          // Vue non authentifié
          <>
            {/* Header */}
            <View className="items-center mb-8 pt-6">
              <View className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center mb-4">
                <Ionicons name="person" size={48} color="#9ca3af" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Bienvenue
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 text-center px-6">
                Connectez-vous pour synchroniser vos données et sauvegarder votre bibliothèque
              </Text>
            </View>

            {/* Boutons de connexion */}
            <View className="mb-6">
              {/* Google Sign-In */}
              <Pressable
                onPress={handleGoogleSignIn}
                className="flex-row items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl py-4 mb-3 active:bg-gray-50"
              >
                <Ionicons name="logo-google" size={24} color="#4285F4" />
                <Text className="text-gray-900 dark:text-white font-semibold text-base ml-3">
                  Se connecter avec Google
                </Text>
              </Pressable>

              {/* Apple Sign-In */}
              <Pressable
                onPress={handleAppleSignIn}
                className="flex-row items-center justify-center bg-black rounded-xl py-4 active:opacity-80"
              >
                <Ionicons name="logo-apple" size={24} color="white" />
                <Text className="text-white font-semibold text-base ml-3">
                  Se connecter avec Apple
                </Text>
              </Pressable>
            </View>

            {/* Info */}
            <View className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={24} color="#3b82f6" />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Mode hors ligne
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400 leading-5">
                    Vous pouvez utiliser l'application sans connexion. Vos données seront stockées localement sur votre appareil.
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          // Vue authentifié (à implémenter)
          <>
            {/* Avatar + Infos utilisateur */}
            <View className="items-center mb-8 pt-6">
              <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-4">
                <Text className="text-white text-4xl font-bold">JD</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                John Doe
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                john.doe@example.com
              </Text>
            </View>

            {/* Options */}
            <View className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
              <Pressable className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-700">
                <View className="flex-row items-center">
                  <Ionicons name="notifications" size={24} color="#3b82f6" />
                  <Text className="text-base text-gray-900 dark:text-white ml-3">
                    Notifications
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>

              <Pressable className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-700">
                <View className="flex-row items-center">
                  <Ionicons name="color-palette" size={24} color="#8b5cf6" />
                  <Text className="text-base text-gray-900 dark:text-white ml-3">
                    Thème
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>

              <Pressable className="flex-row items-center justify-between p-4 active:bg-gray-100 dark:active:bg-gray-700">
                <View className="flex-row items-center">
                  <Ionicons name="settings" size={24} color="#6b7280" />
                  <Text className="text-base text-gray-900 dark:text-white ml-3">
                    Paramètres
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>
            </View>

            {/* Bouton déconnexion */}
            <Pressable
              onPress={handleSignOut}
              className="flex-row items-center justify-center bg-red-500 rounded-xl py-4 active:bg-red-600"
            >
              <Ionicons name="log-out" size={20} color="white" />
              <Text className="text-white font-semibold text-base ml-2">
                Se déconnecter
              </Text>
            </Pressable>
          </>
        )}

        {/* Version de l'app */}
        <Text className="text-xs text-gray-500 dark:text-gray-500 text-center mt-8">
          BookLibrary v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

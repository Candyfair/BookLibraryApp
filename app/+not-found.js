/**
 * Écran 404 - Page introuvable
 *
 * Affiché quand une route n'existe pas dans l'application.
 * Permet à l'utilisateur de retourner à l'accueil facilement.
 */

import { View, Text, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * NotFoundScreen - Écran d'erreur 404
 *
 * Interface simple avec :
 * - Message d'erreur clair
 * - Icône visuelle
 * - Bouton de retour à l'accueil
 */
export default function NotFoundScreen() {
  return (
    <>
      {/* Configuration du header */}
      <Stack.Screen options={{ title: 'Page introuvable' }} />

      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 px-6">
        {/* Icône d'erreur */}
        <View className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-full">
          <Ionicons
            name="alert-circle-outline"
            size={80}
            color="#ef4444"
          />
        </View>

        {/* Message d'erreur */}
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          Page introuvable
        </Text>

        <Text className="text-base text-gray-600 dark:text-gray-400 mb-8 text-center leading-6">
          Désolé, cette page n'existe pas ou a été déplacée.
        </Text>

        {/* Bouton retour à l'accueil */}
        <Link href="/" asChild>
          <Pressable className="flex-row items-center bg-blue-500 px-8 py-4 rounded-xl active:bg-blue-600 shadow-sm">
            <Ionicons name="home" size={20} color="white" />
            <Text className="text-white font-semibold text-base ml-2">
              Retour à l'accueil
            </Text>
          </Pressable>
        </Link>

        {/* Info supplémentaire */}
        <Text className="text-sm text-gray-500 dark:text-gray-500 mt-8 text-center">
          Code d'erreur : 404
        </Text>
      </View>
    </>
  );
}

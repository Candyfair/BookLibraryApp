/**
 * Layout Tabs (Navigation principale)
 *
 * Configure la navigation par onglets (Tabs) avec les écrans principaux :
 * - Accueil (recherche + scan)
 * - Bibliothèque (grille de livres)
 * - Statistiques
 * - Profil
 *
 * Tabs est plus simple que Drawer et ne nécessite pas react-native-reanimated
 */

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

/**
 * TabsLayout - Configuration du Tab Navigator
 *
 * Chaque Screen correspond à un fichier dans app/(tabs)/
 * - index.js → "/"
 * - library.js → "/library"
 * - stats.js → "/stats"
 * - profile.js → "/profile"
 */
export default function TabsLayout() {
  const colorScheme = useColorScheme(); // Détection dark/light mode

  // Couleurs adaptatives selon le thème
  const colors = {
    primary: '#3b82f6', // Bleu (blue-500)
    background: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
    card: colorScheme === 'dark' ? '#374151' : '#f9fafb',
    text: colorScheme === 'dark' ? '#f9fafb' : '#111827',
    textSecondary: colorScheme === 'dark' ? '#9ca3af' : '#6b7280',
    border: colorScheme === 'dark' ? '#4b5563' : '#e5e7eb',
  };

  return (
    <Tabs
      screenOptions={{
        // Style global des tabs
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        // Header configuration
        headerStyle: {
          backgroundColor: colors.card,
          elevation: 2, // Android shadow
          shadowOpacity: 0.1, // iOS shadow
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      {/* Écran d'accueil */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Bibliothèque */}
      <Tabs.Screen
        name="library"
        options={{
          title: 'Bibliothèque',
          tabBarLabel: 'Bibliothèque',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
        }}
      />

      {/* Statistiques */}
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Statistiques',
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />

      {/* Profil utilisateur */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

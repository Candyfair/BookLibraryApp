/**
 * Layout Racine de l'application (Expo Router)
 *
 * Ce fichier configure la navigation de base de l'app :
 * - Stack Navigator principal
 * - Gestion des providers globaux (Auth, Theme, etc.)
 * - Configuration des écrans modaux (scan)
 * - Splash screen et fonts
 *
 * Structure :
 * - (drawer) : Groupe de routes avec Drawer navigation
 * - book/[id] : Route dynamique pour les fiches livres
 * - scan : Modal de scan ISBN
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// Import du CSS global NativeWind
import '../global.css';

// Empêcher le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

/**
 * RootLayout - Layout racine de l'application
 *
 * Responsabilités :
 * - Chargement des fonts
 * - Configuration du Stack Navigator
 * - Gestion du splash screen
 * - Wrapper GestureHandler pour les gestures natives
 */
export default function RootLayout() {
  // Chargement des fonts personnalisées (si nécessaire)
  const [fontsLoaded, fontError] = useFonts({
    // Exemple : 'CustomFont': require('../assets/fonts/CustomFont.ttf'),
  });

  // Cacher le splash screen une fois les fonts chargées
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Attendre que les fonts soient chargées avant de render
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* StatusBar configuration */}
      <StatusBar style="auto" />

      {/* Stack Navigator principal */}
      <Stack
        screenOptions={{
          headerShown: false, // Headers personnalisés dans les écrans
          animation: 'default', // Animation de transition par défaut
        }}
      >
        {/* Tabs Navigation (écrans principaux) */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        {/* Fiche détaillée d'un livre (présentation card) */}
        <Stack.Screen
          name="book/[id]"
          options={{
            presentation: 'card',
            headerShown: true,
            headerTitle: 'Détails du livre',
            headerBackTitle: 'Retour',
          }}
        />

        {/* Modal de scan ISBN */}
        <Stack.Screen
          name="scan"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Scanner un livre',
            headerBackTitle: 'Annuler',
          }}
        />

        {/* Écran 404 */}
        <Stack.Screen
          name="+not-found"
          options={{
            headerShown: true,
            headerTitle: 'Page introuvable',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

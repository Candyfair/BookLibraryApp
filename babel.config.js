// babel.config.js
// Configuration Babel pour Expo avec support expo-router et NativeWind

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          // Désactiver react-native-reanimated pour éviter les erreurs de dépendances
          reanimated: false,
        }
      ],
    ],
    plugins: [
      // Ajoutez ici d'autres plugins si nécessaire
    ],
  };
};
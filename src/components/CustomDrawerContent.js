/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

/**
 * Composant CustomDrawerContent - Menu latéral personnalisé
 *
 * Fonctionnalités :
 * - Header avec titre
 * - Liste des pages de navigation (automatique via DrawerItemList)
 * - Footer avec version et liens
 *
 * Architecture :
 * - Utilise DrawerContentScrollView pour le scroll
 * - DrawerItemList pour la navigation automatique
 * - Sections modulaires
 */
export default function CustomDrawerContent(props) {
  const { state, descriptors, navigation } = props;

  const SubMenuItem = ({ icon, label, filter, indented = true }) => (
    <Pressable
      onPress={() => navigation.navigate('Library', { filter })}
      className={`flex-row items-center py-3 px-6 ${indented ? 'pl-12' : ''}`}
    >
      <Ionicons name={icon} size={20} color="#6b7280" />
      <Text className="ml-3 text-gray-700">{label}</Text>
    </Pressable>
  );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1 }}
      className="bg-gray-50"
    >
      {/* Header du drawer */}
      <View className="p-6 pb-8">
        <Text className="text-2xl font-bold">Ma Bibliothèque</Text>
      </View>

      {/* Items du Drawer */}
      <View className="flex-1 px-2">
        {state.routes.map((route, i) => {
          const focused = i === state.index;
          const { drawerIcon } = descriptors[route.key].options;

          if (route.name === 'AddBook') {
            return (
              <DrawerItem
                key={route.key}
                label="Scanner un livre"
                onPress={() => navigation.navigate('AddBook')}
                icon={drawerIcon}
              />
            );
          }

          if (route.name === 'Library') {
            return (
              <View key={route.key}>
                <DrawerItem
                  label="Voir mes livres"
                  onPress={() => navigation.navigate('Library')}
                  icon={drawerIcon}
                />

                <SubMenuItem label="Favoris" filter="favorite" />
                <SubMenuItem label="Prêtés" filter="lent" />
                <SubMenuItem label="Empruntés" filter="borrowed" />
                <SubMenuItem
                  icon={'heart-outline'}
                  label="Ma wishlist"
                  filter="wishlist"
                  indented={false}
                />
              </View>
            );
          }

          if (route.name === 'Stats') {
            return (
              <DrawerItem
                key={route.key}
                label="Statistiques"
                onPress={() => navigation.navigate('Stats')}
                icon={drawerIcon}
              />
            );
          }
        })}
      </View>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Footer */}
      <View className="border-t border-gray-200 p-4 bg-gray-100">
        <Text className="text-gray-500 text-xs text-center">
          Book Library App v1.0.0
        </Text>
        <Text className="text-gray-400 text-xs text-center mt-1">
          MVP - Stockage local
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

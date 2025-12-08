import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Header Component - Barre de navigation réutilisable
 *
 * Affiche :
 * - Bouton menu burger (ouvre le Drawer)
 * - Bouton profil (navigue vers ProfileStack)
 *
 * @param {Object} props
 * @param {boolean} props.showProfileButton - Afficher ou non le bouton profil (défaut: true)
 */
export default function Header({ showProfileButton = true }) {
  const navigation = useNavigation();

  return (
    <View className="flex flex-row justify-between items-center px-4 py-3">
      {/* Bouton Menu Burger */}
      <Pressable onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu" size={28} color="#000" />
      </Pressable>

      {/* Bouton Profil (conditionnel) */}
      {showProfileButton && (
        <Pressable onPress={() => navigation.navigate('Profil')}>
          <Ionicons name="person-circle-outline" size={28} color="#000" />
        </Pressable>
      )}
    </View>
  );
}

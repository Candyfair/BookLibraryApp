import { useNavigation } from '@react-navigation/native';
import { Pressable, View, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
});

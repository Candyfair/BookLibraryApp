import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Stacks
import HomeStack from './HomeStack';
import LibraryStack from './LibraryStack';
import ProfileStack from './ProfileStack';

// Composants
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#f8fafc',
          width: 280,
        },
        drawerActiveTintColor: '#3b82f6',
        drawerInactiveTintColor: '#64748b',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen
        name="Scanner un livre"
        component={HomeStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Voir mes livres"
        component={LibraryStack}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfileStack}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
}

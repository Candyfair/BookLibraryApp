import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans
import HomeScreen from './src/screens/HomeScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Import du drawer personnalisé
import CustomDrawerContent from './src/components/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

/**
 * Configuration du header personnalisé pour chaque écran
 * - Bouton burger (gauche) : ouvre le drawer
 * - Bouton profil (droite) : navigue vers le profil
 */
const getScreenOptions = (navigation) => ({
  headerStyle: {
    backgroundColor: '#1e293b', // Couleur sombre moderne
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      className="ml-4"
    >
      <Ionicons name="menu" size={28} color="#fff" />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profil')}
      className="mr-4"
    >
      <Ionicons name="person-circle-outline" size={28} color="#fff" />
    </TouchableOpacity>
  ),
});

/**
 * Stack Navigator pour l'écran Accueil
 * Permet d'avoir une navigation en stack si besoin de sous-écrans
 */
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Accueil',
          ...getScreenOptions(navigation),
        })}
      />
    </Stack.Navigator>
  );
}

/**
 * Stack Navigator pour l'écran Bibliothèque
 */
function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryMain"
        component={LibraryScreen}
        options={({ navigation }) => ({
          title: 'Bibliothèque',
          ...getScreenOptions(navigation),
        })}
      />
    </Stack.Navigator>
  );
}

/**
 * Stack Navigator pour l'écran Profil
 */
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'Profil',
          ...getScreenOptions(navigation),
        })}
      />
    </Stack.Navigator>
  );
}

/**
 * Composant principal de l'application
 * Configuration du Drawer avec 3 écrans principaux
 */
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // Utilisation du composant drawer personnalisé
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          // Cache le header par défaut du Drawer (on utilise celui du Stack)
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#f8fafc',
            width: 280,
          },
          drawerActiveTintColor: '#3b82f6', // Bleu pour l'item actif
          drawerInactiveTintColor: '#64748b', // Gris pour les items inactifs
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '600',
          },
        }}
      >
        {/* Écran Accueil */}
        <Drawer.Screen
          name="Scanner un livre"
          component={HomeStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Écran Bibliothèque */}
        <Drawer.Screen
          name="Voir mes livres"
          component={LibraryStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="library-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Écran Profil */}
        <Drawer.Screen
          name="Profil"
          component={ProfileStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans
import AccueilScreen from './screens/AccueilScreen';
import BibliothequeScreen from './screens/BibliothequeScreen';
import ProfilScreen from './screens/ProfilScreen';

// Import du drawer personnalisé
import CustomDrawerContent from './components/CustomDrawerContent';

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
function AccueilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccueilMain"
        component={AccueilScreen}
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
function BibliothequeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BibliothequeMain"
        component={BibliothequeScreen}
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
function ProfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilMain"
        component={ProfilScreen}
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
          name="Accueil"
          component={AccueilStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Écran Bibliothèque */}
        <Drawer.Screen
          name="Bibliothèque"
          component={BibliothequeStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="library-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Écran Profil */}
        <Drawer.Screen
          name="Profil"
          component={ProfilStack}
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

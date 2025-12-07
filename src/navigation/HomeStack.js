import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const getScreenOptions = (navigation) => ({
  headerStyle: {
    backgroundColor: '#1e293b',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerLeft: () => (
    <Pressable
      onPress={() => navigation.toggleDrawer()}
      className="ml-4"
    >
      <Ionicons name="menu" size={28} color="#fff" />
    </Pressable>
  ),
  headerRight: () => (
    <Pressable
      onPress={() => navigation.navigate('Profil')}
      className="mr-4"
    >
      <Ionicons name="person-circle-outline" size={28} color="#fff" />
    </Pressable>
  ),
});

export default function HomeStack() {
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

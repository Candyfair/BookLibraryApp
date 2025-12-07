import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';

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
});

export default function ProfileStack() {
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

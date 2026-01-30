import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibraryScreen from '../screens/LibraryScreen';
import BookEditScreen from '../screens/BookEditScreen';

const Stack = createNativeStackNavigator();

export default function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryMain"
        component={LibraryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookEdit"
        component={BookEditScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

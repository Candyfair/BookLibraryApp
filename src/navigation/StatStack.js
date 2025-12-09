import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Composants
import StatScreen from '../screens/StatScreen';

const Stack = createNativeStackNavigator();

export default function StatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Statistics"
        component={StatScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

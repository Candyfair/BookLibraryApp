import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Composants
import Header from '../components/Header';

export default function StatScreen({ navigation }) {
  return (
    <SafeAreaView>
      {/* Header */}
      <Header />

      <View className="flex items-center">
        <Text className="text-3xl font-semibold">Statistiques</Text>
        <Text>(à implémenter)</Text>
      </View>
    </SafeAreaView>
  );
}

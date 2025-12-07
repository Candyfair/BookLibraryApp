import './global.css';
import { View, Text } from 'react-native';

export default function TestNativeWind() {
  return (
    <View className="flex-1 bg-red-500 items-center justify-center">
      <Text className="text-white text-2xl font-bold">
        Test NativeWind
      </Text>
      <Text className="text-blue-500 mt-4">
        Si ce texte est bleu, NativeWind fonctionne
      </Text>
    </View>
  );
}

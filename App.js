import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Navigation
import RootNavigator from './src/navigation/RootNavigator';

// Context & Components
import { ProfileBottomSheetProvider } from './src/contexts/ProfileBottomSheetContext';
import ProfileBottomSheet from './src/components/ProfileBottomSheet';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ProfileBottomSheetProvider>
            <RootNavigator />
            <ProfileBottomSheet />
          </ProfileBottomSheetProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

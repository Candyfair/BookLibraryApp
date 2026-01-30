import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Database
import { initDatabase } from './src/services/DatabaseService';

// Navigation
import RootNavigator from './src/navigation/RootNavigator';

// Context
import { ProfileBottomSheetProvider } from './src/contexts/ProfileBottomSheetContext';
import { BookDetailBottomSheetProvider } from './src/contexts/BookDetailBottomSheetContext';

export default function App() {
  initDatabase();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ProfileBottomSheetProvider>
            <BookDetailBottomSheetProvider>
              <RootNavigator />
            </BookDetailBottomSheetProvider>
          </ProfileBottomSheetProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

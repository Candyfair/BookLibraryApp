import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Database
import { initDatabase } from './src/services/DatabaseService';

// Navigation
import RootNavigator from './src/navigation/RootNavigator';

// Context & Components
import { ProfileBottomSheetProvider } from './src/contexts/ProfileBottomSheetContext';
import { BookDetailBottomSheetProvider } from './src/contexts/BookDetailBottomSheetContext';
import ProfileBottomSheet from './src/components/ProfileBottomSheet';
import BookDetailBottomSheet from './src/components/BookDetailBottomSheet';

export default function App() {
  initDatabase();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ProfileBottomSheetProvider>
            <BookDetailBottomSheetProvider>
              <RootNavigator />
              <ProfileBottomSheet />
              <BookDetailBottomSheet />
            </BookDetailBottomSheetProvider>
          </ProfileBottomSheetProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

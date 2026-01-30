import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

// Bottom Sheets (doivent être à l'intérieur du NavigationContainer pour useNavigation)
import ProfileBottomSheet from '../components/ProfileBottomSheet';
import BookDetailBottomSheet from '../components/BookDetailBottomSheet';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
      <ProfileBottomSheet />
      <BookDetailBottomSheet />
    </NavigationContainer>
  );
}

import { useFonts } from 'expo-font';
import { LoginScreen } from './src/Screens/LoginScreen';
import { RegistrationScreen } from './src/Screens/RegistrationScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto_400Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto_500Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto_700Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </>
  );
}

import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Main } from './components/Main';

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
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

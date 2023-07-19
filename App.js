import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { LoginScreen } from './screens/autn/LoginScreen';
import { RegistrationScreen } from './screens/autn/RegistrationScreen';
import { Home } from './screens/Home';

const MainStack = createStackNavigator();

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
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Реєстрація">
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Реєстрація"
              component={RegistrationScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Увійти"
              component={LoginScreen}
            />
            <MainStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

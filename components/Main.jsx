import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LoginScreen } from '../screens/autn/LoginScreen';
import { RegistrationScreen } from '../screens/autn/RegistrationScreen';
import { Home } from '../screens/Home';
import { authStateChanged } from '../redux/auth/operations';

const MainStack = createStackNavigator();

export const Main = () => {
  const { stateChange } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  return (
    <NavigationContainer>
      {stateChange ? (
        <MainStack.Navigator>
          <MainStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        </MainStack.Navigator>
      ) : (
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
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

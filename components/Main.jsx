import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LoginScreen } from '../screens/autn/LoginScreen';
import { RegistrationScreen } from '../screens/autn/RegistrationScreen';
import { Home } from '../screens/Home';
import { authStateChanged } from '../redux/auth/operations';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const useRoute = isAuth => {
  if (isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      </MainStack.Navigator>
    );
  } else {
    return (
      <AuthStack.Navigator initialRouteName="Увійти">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Реєстрація"
          component={RegistrationScreen}
        />
        <AuthStack.Screen options={{ headerShown: false }} name="Увійти" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }
};

export const Main = () => {
  const { stateChange } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

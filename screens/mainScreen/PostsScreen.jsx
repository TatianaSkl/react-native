import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { DefaultScreenPosts } from '../nestedScreen/DefaultScreenPosts';
import { CommentsScreen } from '../nestedScreen/CommentsScreen';
import { MapScreen } from '../nestedScreen/MapScreen';
import { authSignOutUser } from '../../redux/auth/operations';

const NestedScreen = createStackNavigator();

export const PostsSceen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: { fontFamily: 'Roboto-Medium', fontSize: 17 },
        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 10, paddingTop: 10 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 10, paddingTop: 10 },
        headerStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0.5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 0,
        },
      }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: 'Публікації',
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <NestedScreen.Screen
        name="Карта"
        component={MapScreen}
        options={{
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};

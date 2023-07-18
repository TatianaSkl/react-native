import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { DefaultScreenPosts } from '../nestedScreen/DefaultScreenPosts';
import { CommentsScreen } from '../nestedScreen/CommentsScreen';
import { MapScreen } from '../nestedScreen/MapScreen';

const NestedScreen = createStackNavigator();

export const PostsSceen = () => {
  const navigation = useNavigation();
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
            <TouchableOpacity onPress={() => navigation.navigate('Увійти')}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Коментарі" component={CommentsScreen} />
      <NestedScreen.Screen name="Карта" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { PostsSceen } from './PostsScreen';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          if (route.name === 'Публікації') {
            iconComponent = <Feather name="grid" size={size} color={color} />;
          } else if (route.name === 'Профіль') {
            iconComponent = <Feather name="user" size={size} color={color} />;
          }
          return iconComponent;
        },
        tabBarStyle: { height: 70, justifyContent: 'center' },
        headerTitleAlign: 'center',
        headerTitleStyle: { fontFamily: 'Roboto-Medium', fontSize: 17, fontWeight: 500 },
        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 10, paddingTop: 10 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 10, paddingTop: 10 },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'black',
        showLabel: false,
      }}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsSceen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Увійти')}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: () => (
            <View style={styles.btn}>
              <Feather name="plus" size={13} color="white" />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Публікації')}>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen name="Профіль" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    paddingHorizontal: 28.5,
    paddingVertical: 13.5,
    alignItems: 'center',
  },
});

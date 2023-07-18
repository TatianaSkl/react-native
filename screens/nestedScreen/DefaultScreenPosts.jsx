import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';

export const DefaultScreenPosts = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const location = route.params?.currentLocation;

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
      console.log(posts);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.avatar}>
          <Image />
        </View>
        <View>
          <Text style={styles.nickName}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32 }}>
            <Image source={{ uri: item.postPhoto }} style={styles.foto} />
            <Text style={styles.title}>{item.photoName}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Коментарі')}>
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.quantity}>0</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Карта', { location })}>
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.location}>{item.locationName}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  wrapper: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#E8E8E8',
  },
  nickName: {
    marginTop: 16,
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    color: '#212121',
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: 'rgba(33, 33, 33, 0.80)',
  },
  foto: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    marginBottom: 8,
  },
  quantity: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
    marginLeft: 6,
  },
  location: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
});

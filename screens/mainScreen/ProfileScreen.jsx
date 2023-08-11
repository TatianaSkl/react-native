import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { db } from '../../firebase/config';
import { getRandomNumber } from '../../service/RandomNumber';
import { authSignOutUser } from '../../redux/auth/operations';

export const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login, avatar } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getUserPosts = async () => {
    const postsQuery = await query(collection(db, 'posts'), where('userId', '==', userId));
    await onSnapshot(postsQuery, async querySnapshot => {
      const posts = [];
      for (const doc of querySnapshot.docs) {
        const postData = doc.data();
        const postId = doc.id;

        const commentQuery = query(collection(db, 'posts', postId, 'comments'));
        const commentSnapshot = await getDocs(commentQuery);
        const commentCount = commentSnapshot.docs.length;

        posts.push({
          ...postData,
          id: postId,
          commentCount: commentCount,
        });
      }

      setUserPosts(posts);
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <ImageBackground style={styles.image} source={require('../../assets/images/bg.jpg')}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.fotoWrapper}>
            <Image
              source={{ uri: avatar }}
              style={{
                height: 120,
                borderRadius: 16,
              }}
            />
            <TouchableOpacity style={styles.fotoBtn}>
              <Feather name="x-circle" size={25} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={signOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.nickName}>{login}</Text>
        </View>
        <FlatList
          style={{ backgroundColor: '#fff', paddingHorizontal: 16 }}
          data={userPosts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 32 }}>
              <Image source={{ uri: item.photo }} style={styles.foto} />
              <Text style={styles.title}>{item.photoName}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => navigation.navigate('Коментарі', { item })}>
                    <Feather
                      name="message-circle"
                      size={24}
                      color={item.commentCount > 0 ? '#FF6C00' : '#BDBDBD'}
                    />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.quantity,
                      item.commentCount > 0
                        ? {
                            color: '#212121',
                          }
                        : {
                            color: '#BDBDBD',
                          },
                    ]}
                  >
                    {item.commentCount}
                  </Text>
                  <TouchableOpacity style={{ marginLeft: 24 }}>
                    <Feather name="thumbs-up" size={24} color="#FF6C00" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{getRandomNumber()}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Карта', { location: item.currentLocation })}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                  <Text style={styles.location}>{item.locationName}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 147,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  wrapper: {
    position: 'relative',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
  fotoWrapper: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -60,
    left: '40%',
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  fotoBtn: {
    position: 'absolute',
    top: 80,
    left: 107,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  nickName: {
    marginTop: 46,
    marginBottom: 33,
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#212121',
    textAlign: 'center',
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
    color: '#212121',
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

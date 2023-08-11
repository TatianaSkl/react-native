import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { collection, query, getDocs } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { db } from '../../firebase/config';

export const DefaultScreenPosts = () => {
  const [posts, setPosts] = useState([]);
  const { login, email, avatar } = useSelector(state => state.auth);
  const navigation = useNavigation();

  const getAllPosts = async () => {
    const postsQuery = query(collection(db, 'posts'));
    const postsSnapshot = await getDocs(postsQuery);
    const newPosts = postsSnapshot.docs.map(async doc => {
      const postData = doc.data();
      const postId = doc.id;

      const commentQuery = query(collection(db, 'posts', postId, 'comments'));
      const commentSnapshot = await getDocs(commentQuery);

      return {
        ...postData,
        id: postId,
        commentCount: commentSnapshot.docs.length,
      };
    });

    Promise.all(newPosts).then(postsWithCommentCount => {
      setPosts(postsWithCommentCount);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: avatar }}
            style={{
              height: 60,
              borderRadius: 16,
            }}
          />
        </View>
        <View>
          <Text style={styles.nickName}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
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

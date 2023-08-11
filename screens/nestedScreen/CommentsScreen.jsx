import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../../firebase/config';

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { avatar } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { photo, id } = route.params.item;

  const createComment = async () => {
    setComment('');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('uk-UK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formattedTime = currentDate.toLocaleTimeString('uk-UK', {
      hour: 'numeric',
      minute: 'numeric',
    });

    const formattedDateTime = `${formattedDate} | ${formattedTime}`;
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment,
      avatar,
      formattedDate: formattedDateTime,
    });
  };

  const getAllComments = async () => {
    const commentQuery = query(collection(db, 'posts', id, 'comments'));
    await onSnapshot(commentQuery, querySnapshot => {
      const comments = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setAllComments(comments);
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.foto} />
      <FlatList
        style={styles.allComments}
        data={allComments}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 24, flexDirection: 'row' }}>
            <View style={styles.login}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            </View>
            <View style={styles.comment}>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.date}>{item.formattedDate}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="Коментувати..."
          placeholderTextColor="#BDBDBD"
          type={'text'}
          name={'comment'}
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.btn,
            comment ? { backgroundColor: '#FF6C00' } : { backgroundColor: '#BDBDBD' },
          ]}
          onPress={createComment}
        >
          <Feather name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  foto: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    height: 50,
    width: '100%',
    borderRadius: 100,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
  },
  btn: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    width: 34,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: '#E8E8E8',
  },
  comment: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#212121',
    marginBottom: 8,
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#BDBDBD',
    textAlign: 'right',
  },
});

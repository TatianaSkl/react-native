import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.fotoWrapper}>
        <Image source={require('../../assets/images/foto.png')} />
      </View>
      <Text style={styles.fotoText}>Завантажте фото</Text>
      <TextInput style={styles.input} placeholder="Назва..." placeholderTextColor="#BDBDBD" />
      <View style={styles.mapInput}>
        <Feather name="map-pin" size={24} color="#BDBDBD" />
        <TextInput
          style={styles.mapTextInput}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
        <Text style={styles.btnText}>Опубліковати</Text>
      </TouchableOpacity>
      <View style={styles.deleteBtnWrapper}>
        <TouchableOpacity activeOpacity={0.8} style={styles.deleteBtn}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
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
    paddingBottom: 22,
    backgroundColor: '#fff',
  },
  fotoWrapper: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  fotoText: {
    color: '#BDBDBD',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
  },
  input: {
    marginTop: 32,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
  },
  mapInput: {
    flexDirection: 'row',
    marginBottom: 32,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
  },
  mapTextInput: {
    marginLeft: 4,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
  },
  btn: {
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: {
    color: '#BDBDBD',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
  },
  deleteBtnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
  },
  deleteBtn: {
    width: 70,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 23,
    paddingVertical: 8,
  },
});

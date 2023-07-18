import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export const CreatePostsScreen = () => {
  const [postPhoto, setPostPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({});
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPostPhoto(uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onReset = () => {
    setPostPhoto(null);
    setPhotoName('');
    setLocationName('');
  };

  const sendPhoto = () => {
    navigation.navigate('DefaultScreen', { postPhoto, photoName, locationName, currentLocation });
    onReset();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        {postPhoto ? (
          <Image
            source={{ uri: postPhoto }}
            style={{
              height: 240,
              borderRadius: 8,
            }}
          />
        ) : (
          <Camera style={styles.fotoWrapper} ref={cameraRef}>
            <TouchableOpacity activeOpacity={0.2} onPress={takePhoto}>
              <Image source={require('../../assets/images/foto.png')} />
            </TouchableOpacity>
          </Camera>
        )}
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <Text style={styles.fotoText}>{postPhoto ? 'Редагувати фото' : 'Завантажте фото'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          type={'text'}
          name={'photoName'}
          value={photoName}
          onChangeText={setPhotoName}
        />
        <View style={styles.mapInput}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <TextInput
            style={styles.mapTextInput}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            type={'text'}
            name={'locationName'}
            value={locationName}
            onChangeText={setLocationName}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.btn,
            postPhoto
              ? {
                  backgroundColor: '#FF6C00',
                }
              : {
                  backgroundColor: '#F6F6F6',
                },
          ]}
          onPress={sendPhoto}
        >
          <Text
            style={[
              styles.btnText,
              postPhoto
                ? {
                    color: '#FFFFFF',
                  }
                : {
                    color: '#BDBDBD',
                  },
            ]}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
        <View style={styles.deleteBtnWrapper}>
          <TouchableOpacity activeOpacity={0.8} style={styles.deleteBtn} onPress={onReset}>
            <Feather name="trash-2" size={24} color={postPhoto ? '#FF6C00' : '#BDBDBD'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  fotoText: {
    marginTop: 8,
    color: '#BDBDBD',
    fontSize: 16,
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
    width: 340,
    marginLeft: 4,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
  },
  btn: {
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 120,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  deleteBtnWrapper: {
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

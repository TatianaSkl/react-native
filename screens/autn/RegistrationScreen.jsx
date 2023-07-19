import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { registerDB } from '../../redux/auth/operations';

const initialState = {
  login: '',
  email: '',
  password: '',
};

export const RegistrationScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRegistration = () => {
    if (!state.login || !state.email || !state.password) {
      Alert.alert(`Усі поля мають бути заповнені!`);
      return;
    }
    if (!isValidEmail(state.email)) {
      Alert.alert('Будь ласка, введіть коректну (example@example.com) адресу електронної пошти!');
      return;
    }
    Alert.alert(`${state.login}, успішно зареєстрован!`);
    console.log(state);
    dispatch(registerDB(state));
    setState(initialState);
    navigation.navigate('Home');
  };

  const isValidEmail = email => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const keyboardHide = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/images/bg.jpg')}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS !== 'ios' ? -150 : 0}
          >
            <View style={styles.form}>
              <View style={styles.fotoWrapper}>
                <TouchableOpacity style={styles.fotoBtn}>
                  <Feather name="plus" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={styles.input}
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                onFocus={() => setShowKeyboard(true)}
                value={state.login}
                onChangeText={value => setState(prevState => ({ ...prevState, login: value }))}
              />
              <TextInput
                style={styles.input}
                autoComplete="email"
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                onFocus={() => setShowKeyboard(true)}
                value={state.email}
                onChangeText={value => setState(prevState => ({ ...prevState, email: value }))}
              />
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.passwordTextInput}
                  autoComplete="password"
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  onFocus={() => setShowKeyboard(true)}
                  value={state.password}
                  onChangeText={value => setState(prevState => ({ ...prevState, password: value }))}
                />
                <TouchableOpacity activeOpacity={0.2} onPress={handleTogglePasswordVisibility}>
                  <Text style={styles.showPasswordButtonText}>
                    {showPassword ? 'Сховати' : 'Показати'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={onRegistration}>
                <Text style={styles.btnText}>Зареєстуватися</Text>
              </TouchableOpacity>
              <View style={styles.wrapper}>
                <Text style={styles.text}>
                  Вже є акаунт? <Text onPress={() => navigation.navigate('Увійти')}>Увійти</Text>
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    position: 'relative',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 45,
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
    width: 25,
    height: 25,
    top: 80,
    left: 107,
    borderWidth: 1,
    borderColor: '#FF6C00',
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    borderRadius: 10,
    color: '#212121',
    backgroundColor: '#F6F6F6',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    height: 50,
    marginBottom: 43,
    padding: 15,
    backgroundColor: '#F6F6F6',
  },
  passwordTextInput: {
    flex: 1,
    color: '#212121',
  },
  showPasswordButtonText: {
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 32,
    color: '#212121',
    lineHeight: 35.16,
    letterSpacing: 0.01,
    fontFamily: 'Roboto-Medium',
  },
  btn: {
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  wrapper: {
    alignItems: 'center',
  },
  text: {
    color: '#1B4371',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});

// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCJPET8RvVth9e7sg1aJgMgdS3F3qEdGDk',
  authDomain: 'react-native-tatianaskl.firebaseapp.com',
  databaseURL: 'https://react-native-tatianaskl-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-native-tatianaskl',
  storageBucket: 'react-native-tatianaskl.appspot.com',
  messagingSenderId: '259543142554',
  appId: '1:259543142554:web:09007659b34502edaf8f23',
  measurementId: 'G-63SX3SPGH8',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

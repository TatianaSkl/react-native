import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authSlice';
import { Alert } from 'react-native';
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const registerDB =
  ({ mail, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, mail, password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: login,
        photoURL: avatar,
      });
      const { uid, displayName, email, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          userEmail: email,
          avatar: photoURL,
        })
      );
      console.log(updateUserProfile);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const loginDB =
  ({ mail, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, mail, password);
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          userEmail: user.email,
          avatar: user.photoURL,
        })
      );
    } catch (error) {
      Alert.alert(`Користувач не знайдений!`);
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const authStateChanged = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, user => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        userEmail: user.email,
        avatar: user.photoURL,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

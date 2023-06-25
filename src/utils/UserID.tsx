import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const getUserId = async () => {
  const currentUser = auth().currentUser;
  let userId = '';
  if (currentUser) {
    userId = currentUser.uid || '';
  } else {
    try {
      await GoogleSignin.hasPlayServices();
      const currentUser = await GoogleSignin.getCurrentUser();
      userId = currentUser?.user.id || '';
    } catch (error) {
      console.log('Google Sign-In error:', error);
      return error;
    }
  }
  return userId;
};

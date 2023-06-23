import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NavigationProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {setDataToAsyncStorage} from './AuthChecker';
import {useDispatch} from 'react-redux';
import {updateUser} from '../Store/Slice/UserSlice';

export const signIn = async (navigation: NavigationProp<any>) => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    const {givenName, email, id} = userInfo.user;

    const userSnapshot = await firestore()
      .collection('Users')
      .where('email', '==', email)
      .get();

    if (userSnapshot.empty) {
      const userData = {
        userId: id,
        name: givenName,
        email: email,
      };

      await firestore().collection('Users').add(userData);
      return userData;
    } else {
      const userData: any[] = [];

      userSnapshot.forEach(doc => {
        const user = doc.data();
        userData.push(user);
      });

      return userData[0];
      // return userSnapshot;
    }
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('user cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('operation (e.g. sign in) is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('play services not available or outdated');
    } else {
      console.log(error);
    }
  }
};

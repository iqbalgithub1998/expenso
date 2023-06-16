import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NavigationProp } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export const signIn = async (navigation: NavigationProp<any>) => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    console.log("USER INFORMATION", userInfo);
    const { givenName, email, id } = userInfo.user;
    console.log(givenName,email,id)
    const userData = {
      userId: id,
      name: givenName,
      email: email,
    };

    await firestore().collection('Users').add(userData);
    console.log("Data added to user collection")
    //navigation.navigate('HomeTab',{ userInfo: userInfo });
    return userInfo;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("user cancelled the login flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("operation (e.g. sign in) is in progress already");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("play services not available or outdated");
    } else {
      console.log(error);
    }
  }
};

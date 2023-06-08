import { useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NavigationProp } from '@react-navigation/native';

type SignInProps = {
  navigation: NavigationProp<any>; // Replace with your navigation prop type
};

const configureGoogleSignIn = () => {
  GoogleSignin.configure();
};

const handleSignIn = async ({ navigation }: SignInProps) => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    console.log("USER INFORMATION", userInfo);
    navigation.navigate('Home');
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("User cancelled the login flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("Operation (e.g. sign in) is in progress already");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("Play services not available or outdated");
    } else {
      console.log(error);
    }
  }
};

export const GoogleSignInButton: React.FC<SignInProps> = ({ navigation }) => {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleButtonPress = () => {
    handleSignIn({ navigation });
  };

  return (
    // Replace with your sign-in button component or UI
    <button onClick={handleButtonPress}>Sign In with Google</button>
  );
};

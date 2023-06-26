import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ReactNode, createContext, useState} from 'react';
import {Alert} from 'react-native';
//import { AppNavigationParams } from './AppNavigation';
//import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
  //props: any
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  //const navigation = useNavigation();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const login = async (email: string, password: string) => {
    // try {
    //   await auth().signInWithEmailAndPassword(email, password);
    // } catch (e) {
    //   console.log(e);
    //   Alert.alert('Login Error', 'Invalid email or password');
    // }
    return new Promise<void>(async (resolve, reject) => {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        resolve();
      } catch (error: any) {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Login Error', 'Invalid email or password');
        } else {
          Alert.alert('Login Error', 'An error occurred during login');
        }
        reject(error);
      }
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return new Promise<void>(async (resolve, reject) => {
      console.log('Register function called');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      try {
        const userSnapshot = await firestore()
          .collection('Users')
          .where('email', '==', email)
          .get();

        if (!userSnapshot.empty) {
          // Email is already registered, display an error message
          Alert.alert('Error', 'Email is already registered.');
          resolve();
        } else {
          const {user} = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );
          console.log(user);
          if (user) {
            await user.updateProfile({
              displayName: name,
            });
            await user.reload();
            const userData = {
              userId: user.uid,
              name: user.displayName || name,
              email: user.email,
            };

            await firestore().collection('Users').add(userData);
          }
          resolve();
        }
      } catch (error: any) {
        console.log(error);
        Alert.alert('Registration Error', 'User already Registered');
        reject(error);
      }
    });
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const authContextValue: AuthContextProps = {
    user,
    setUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

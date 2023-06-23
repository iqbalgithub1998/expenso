import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useContext, useState, useEffect, useRef} from 'react';
import CustomButton from '../components/CustomButton';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Formik, FormikState, FormikValues} from 'formik';
import * as Yup from 'yup';

import {AuthContext} from '../navigation/AuthStackProvider';
import {signIn} from '../utils/GoogleSignIn';
import auth from '@react-native-firebase/auth';
import {setDataToAsyncStorage} from '../utils/AuthChecker';
import {useDispatch} from 'react-redux';
import {updateUser} from '../Store/Slice/UserSlice';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormikValues>() as any;
  const pressHandler = () => {
    navigation.goBack();
  };

  const pressSignUp = () => {
    navigation.navigate('SignUp');
  };
  const forgotPress = () => {
    navigation.navigate('ForgotPassword');
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleGoogleSignIn = async () => {
    const userInfo = await signIn(navigation);
    await setDataToAsyncStorage(userInfo, 'ExpensoUserData');
    dispatch(updateUser(userInfo));
  };

  const [showPass, setShowPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useContext(AuthContext);
  const initialValues = {
    email: '',
    password: '',
  };

  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }

  const loginWithEmailAndPassword = async (
    values: any,
    resetForm: {
      (
        nextState?:
          | Partial<
              FormikState<{
                email: string;
                password: string;
              }>
            >
          | undefined,
      ): void;
      (arg0: {
        values: {
          email: string;
          password: string;
        };
      }): void;
    },
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    const {email, password} = values;
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      console.log('user in login file', user);
      const userData = {
        userId: user.user.uid,
        name: user.user.displayName,
        email: user.user.email,
      };
      await setDataToAsyncStorage(userData, 'ExpensoUserData');
      dispatch(updateUser(userData));
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Login Error', 'Invalid email or password');
      } else {
        Alert.alert('Login Error', 'An error occurred during login');
      }
    }
  };

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={(values, {resetForm, setSubmitting}) => {
        loginWithEmailAndPassword(values, resetForm, setSubmitting);
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        handleSubmit,
        isSubmitting,
      }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            paddingTop: SIZES.STATUSBAR_HEIGHT,
          }}>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <View style={{marginBottom: 60}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={pressHandler}
                  style={{
                    position: 'absolute',
                    left: -1,
                  }}>
                  <Ionicons
                    name="ios-arrow-back-outline"
                    size={35}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
                <Text style={styles.signUp}>Login</Text>
              </View>
            </View>
            <View style={{marginBottom: 22}}>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="grey"
                  keyboardType="email-address"
                  style={styles.inputText}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={{marginBottom: 35}}>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="grey"
                  secureTextEntry={showPass}
                  style={styles.inputText}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                <TouchableOpacity
                  onPress={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: 12,
                  }}>
                  {showPass == true ? (
                    <Ionicons name="eye-off" size={25} color={COLORS.grey} />
                  ) : (
                    <Ionicons name="eye" size={25} color={COLORS.black} />
                  )}
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <CustomButton
              isLoading={isLoading}
              title="LOGIN"
              onPress={handleSubmit}
              Style={styles.button}
              titleStyle={styles.ButtonText}
              disabled={!isValid || isSubmitting}
              backgroundColor={COLORS.primary}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View style={styles.line} />
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.grey,
                  fontWeight: '600',
                  marginHorizontal: 10,
                }}>
                Or with
              </Text>
              <View style={styles.line} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                elevation: 8,
              }}>
              <TouchableOpacity
                onPress={handleGoogleSignIn}
                style={styles.googleLogin}>
                <Image
                  source={require('../assets/images/google.png')}
                  style={{
                    height: 36,
                    width: 36,
                    marginRight: 8,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '800',
                    color: COLORS.grey,
                  }}>
                  {' '}
                  Sign in with Google
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', padding: 20}}>
              <Pressable onPress={forgotPress}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: COLORS.primary,
                  }}>
                  Forgot Password ?
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 20,
              }}>
              <Text style={{fontSize: 14, color: COLORS.grey}}>
                {' '}
                Do not have an account yet ?
              </Text>
              <Pressable onPress={pressSignUp}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.primary,
                    fontWeight: 'bold',
                    marginLeft: 6,
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                  }}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  signUp: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
    textAlign: 'center',
    //marginLeft:80
  },
  inputBox: {
    width: '100%',
    height: 65,
    borderColor: COLORS.lightgrey,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 18,
  },
  inputText: {
    textAlign: 'left',
    width: '100%',
    fontSize: 20,
    color: COLORS.black,
  },
  button: {
    width: '100%',
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 15,
    elevation: 8,
  },
  ButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
  googleLogin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 15,
    marginTop: 15,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    paddingLeft: 10,
    paddingTop: 2,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightgrey,
    marginHorizontal: 5,
  },
});

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
import {useContext, useEffect, useState} from 'react';
import {Checkbox} from 'react-native-paper';
import CustomButton from '../components/CustomButton';

import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../navigation/AuthStackProvider';
import {signIn} from '../utils/GoogleSignIn';
import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {setDataToAsyncStorage} from '../utils/AuthChecker';
import {useDispatch} from 'react-redux';
import {updateUser} from '../Store/Slice/UserSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your Email'),
  password: Yup.string()
    .min(8)
    .required('Please Enter Password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Must be 8 digits and combination of Uppercase, Lowercase, number and specialsymbols',
    ),
  confirmPassword: Yup.string()
    .min(8)
    .oneOf([Yup.ref('password')], 'Passwords not matching')
    .required('Confirm your Password'),
});

const SignUp: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleGoogleSignIn = async () => {
    const userInfo = await signIn(navigation);
    await setDataToAsyncStorage(userInfo, 'ExpensoUserData');
    dispatch(updateUser(userInfo));
  };

  //const navigation = useNavigation();
  const [showPass, setShowPass] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const handlePress = () => {
    navigation.goBack();
  };

  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }

  const onSignUpWithEmailAndPassword = async (
    data: any,
    resetForm: {
      (
        nextState?:
          | Partial<
              FormikState<{
                name: string;
                email: string;
                password: string;
                confirmPassword: string;
              }>
            >
          | undefined,
      ): void;
      (arg0: {
        values: {
          name: string;
          email: string;
          password: string;
          confirmPassword: string;
        };
      }): void;
    },
  ) => {
    const {email, name, password} = data;
    try {
      const userSnapshot = await firestore()
        .collection('Users')
        .where('email', '==', email)
        .get();

      if (!userSnapshot.empty) {
        // Email is already registered, display an error message
        Alert.alert('Error', 'Email is already registered.');
      } else {
        const {user} = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        if (user) {
          user.updateProfile({
            displayName: name,
          });
          // const updatedUser = await user.reload(); // Refresh the user data
          // console.log('updatedUser', updatedUser);
          const userData = {
            userId: user.uid,
            name: name,
            email: user.email,
          };
          await firestore().collection('Users').add(userData);
          await setDataToAsyncStorage(userData, 'ExpensoUserData');
          dispatch(updateUser(userData));
        }
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert('Registration Error', 'User already Registered');
      return error;
    } finally {
      setShowPass(false);
      resetForm({values: initialValues});
      // setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values, {resetForm}) => {
        onSignUpWithEmailAndPassword(values, resetForm);
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
            <View style={{marginBottom: 40}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginBottom: 15,
                }}>
                <TouchableOpacity
                  onPress={handlePress}
                  style={{
                    position: 'absolute',
                    left: -2,
                  }}>
                  <Ionicons
                    name="ios-arrow-back-outline"
                    size={35}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
                <Text style={styles.signUp}>Sign up</Text>
              </View>
            </View>
            <View style={{marginBottom: 15}}>
              {/* <Text style = {styles.inputTitle}>
                    NAME
                </Text> */}
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={COLORS.grey}
                  style={styles.inputText}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                />
              </View>
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
            <View style={{marginBottom: 10}}>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={COLORS.grey}
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
            <View style={{marginBottom: 10}}>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={COLORS.grey}
                  secureTextEntry={showPass}
                  style={styles.inputText}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                <TouchableOpacity
                  onPress={() => setShowPass(prevState => !prevState)}
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

            <View style={{marginBottom: 10}}>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.grey}
                  secureTextEntry={showPass}
                  style={styles.inputText}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                />
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 12,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
                color={isChecked ? COLORS.primary : undefined}
              />
              <Text style={{fontSize: 14, paddingLeft: 4, color: COLORS.black}}>
                By Signing up, you agree to the{' '}
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.primary,
                    marginLeft: 8,
                  }}>
                  Terms of Service and Privacy Policy
                </Text>
              </Text>
            </View>

            <CustomButton
              isLoading={isLoading}
              title="Sign Up"
              onPress={handleSubmit}
              Style={[
                styles.button,
                {backgroundColor: isValid ? COLORS.primary : COLORS.grey},
              ]}
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
                  marginHorizontal: 10,
                  fontSize: 14,
                  color: COLORS.grey,
                  fontWeight: '600',
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
                    fontWeight: '600',
                    color: COLORS.black,
                  }}>
                  {' '}
                  Sign Up with Google
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 20,
              }}>
              <Text style={{fontSize: 16, color: COLORS.grey}}>
                {' '}
                Already Have an account ?
              </Text>
              <Pressable onPress={gotoLogin}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.primary,
                    fontWeight: 'bold',
                    marginLeft: 6,
                    textDecorationLine: 'underline',
                  }}>
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signUp: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
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
  inputTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginVertical: 8,
    color: COLORS.black,
    paddingLeft: 10,
  },
  button: {
    width: '100%',
    minHeight: 60,
    //backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 15,
    elevation: 8,
    marginTop: 6,
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
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    marginRight: 4,
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
    marginHorizontal: 10,
  },
});

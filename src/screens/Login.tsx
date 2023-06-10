import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useContext, useState, useEffect} from 'react';
//import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../components/CustomButton';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppNavigationParams} from '../navigation/AppNavigation';

import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';

import {AuthContext} from '../navigation/AuthStackProvider';

type Props = NativeStackScreenProps<AppNavigationParams, 'Home'>;

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC<Props> = ({navigation}) => {
  //const navigation = useNavigation();

  const onLoginPress = () => {
    navigation.navigate('Home');
  };

  const navigateLogin = () => {
    navigation.navigate('SignUp');
  };

  const pressHandler = () => {
    navigation.goBack();
  };
  const forgotPress = () => {
    navigation.navigate('ForgotPassword');
  };

  const [showPass, setShowPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //const formik = useFormikContext();

  const {login} = useContext(AuthContext);
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={async (values, {resetForm}) => {
        {
          try {
            setIsLoading(true);
            await login(values.email, values.password);
            resetForm({values: initialValues});
            navigation.navigate('Home');
          } catch (error) {
            console.log('Login error:', error);
          } finally {
            setIsLoading(false); // Set loading state back to false
          }
        }
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        handleSubmit,
      }) => (
        <View style={{flex: 1, backgroundColor: COLORS.white, height: '100%'}}>
          <StatusBar backgroundColor={COLORS.white} />
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: SIZES.height - SIZES.STATUSBAR_HEIGHT,
              }}>
              <ActivityIndicator size={100} color={COLORS.primary} />
            </View> // Replace with your loader component or indicator
          ) : (
            <View style={{flex: 1, marginHorizontal: 10}}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginBottom: 50,
                  }}>
                  <TouchableOpacity
                    onPress={pressHandler}
                    style={{
                      position: 'absolute',
                      left: -1,
                    }}>
                    <Ionicons
                      name="ios-arrow-back-outline"
                      size={45}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                  <Text style={styles.signUp}>Login</Text>
                </View>
              </View>
              <View style={{marginBottom: 22, marginTop: 10}}>
                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Email Address"
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
                title="LOGIN"
                onPress={handleSubmit}
                Style={[
                  styles.button,
                  {backgroundColor: isValid ? COLORS.primary : COLORS.grey},
                ]}
                titleStyle={styles.ButtonText}
                disabled={!isValid}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: COLORS.grey,
                    marginHorizontal: 10,
                  }}
                />
                <Text style={{fontSize: 14, color: COLORS.gray}}>
                  Or Sign In with
                </Text>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: COLORS.grey,
                    marginHorizontal: 10,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  elevation: 8,
                }}>
                <TouchableOpacity
                  onPress={() => console.log('Google LOGIN Pressed')}
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
                    Sign Up with Google
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
                  marginVertical: 15,
                }}>
                <Text style={{fontSize: 14, color: COLORS.grey}}>
                  {' '}
                  Do not have an account yet ?
                </Text>
                <Pressable onPress={navigateLogin}>
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
          )}
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
    height: 58,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 18,
  },
  inputText: {
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 12,
    fontSize: 18,
  },
  button: {
    width: '100%',
    minHeight: 60,
    backgroundColor: COLORS.primary,
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
});

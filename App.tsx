import {Platform, StyleSheet, StatusBar, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {UserInterface as UserType} from './src/interface/User.interface';
import {CheckAuth} from './src/utils/AuthChecker';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from './src/Store/Slice/UserSlice';
import {RootState} from './src/Store/rootReducer';
import AuthStack from './src/navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import AppTabNavigator from './src/navigation/AppTabNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {COLORS} from './src/constants/theme';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  //success: (props:any) => (
  //   <BaseToast
  //     {...props}
  //     style={{ borderLeftColor: 'pink' }}
  //     contentContainerStyle={{ paddingHorizontal: 15 }}
  //     text1Style={{
  //       fontSize: 15,
  //       fontWeight: '400'
  //     }}
  //   />
  // ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  // error: (props) => (
  //   <ErrorToast
  //     {...props}
  //     text1Style={{
  //       fontSize: 17
  //     }}
  //     text2Style={{
  //       fontSize: 15
  //     }}
  //   />
  // ),
  // /*
  //   Or create a completely new type - `tomatoToast`,
  //   building the layout from scratch.

  //   I can consume any custom `props` I want.
  //   They will be passed when calling the `show` method (see below)
  // */
  DataToast: ({text1, text2}: {text1: string; text2: string}) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: '#45B649',
        alignSelf: 'center',
        borderRadius: 15,
      }}>
      <Text style={{color: COLORS.secondary, fontSize: 16}}>{text1}</Text>
      <Text style={{color: COLORS.secondary}}>{text2}</Text>
    </View>
  ),
};

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  // console.log('user in app.tsx', user);

  useEffect(() => {
    CheckForLoggedInUser();
  }, []);

  const CheckForLoggedInUser = async () => {
    try {
      const userData: Partial<UserType> | boolean = await CheckAuth();
      if (!!userData) {
        dispatch(updateUser(userData));
        setTimeout(() => {
          SplashScreen.hide();
        }, 200);
      }
    } catch (error) {
      SplashScreen.hide();
    }
  };

  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }

  return (
    <>
      <GestureHandlerRootView style={styles.mainContainer}>
        {Platform.OS === 'ios' ? (
          <StatusBar barStyle="dark-content" />
        ) : (
          <StatusBar barStyle="default" />
        )}
        {/* <Text>Hello</Text> */}
        <NavigationContainer>
          {user.userId != null ? <AppTabNavigator /> : <AuthStack />}
        </NavigationContainer>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

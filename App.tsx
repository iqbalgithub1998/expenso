import {Platform, StyleSheet, StatusBar, View} from 'react-native';
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
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

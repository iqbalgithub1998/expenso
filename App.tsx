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

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    CheckForLoggedInUser();
  }, []);

  const CheckForLoggedInUser = async () => {
    const userData: Partial<UserType> = await CheckAuth();
    if (!!userData) {
      dispatch(updateUser(userData));
    }
  };

  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }

  return (
    <View style={styles.mainContainer}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="dark-content" />
      ) : (
        <StatusBar barStyle="default" />
      )}
      <NavigationContainer>
        {user ? <AppTabNavigator /> : <AuthStack />}
      </NavigationContainer>
      {/* <AppNavigation
        Initial={undefined}
        Login={undefined}
        SignUp={undefined}
        Welcome={undefined}
        ForgotPassword={undefined}
        Confirmation={undefined}
        HomeTab={undefined}
        Expense={undefined}
        Income={undefined}
        Transfer={undefined}
      /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

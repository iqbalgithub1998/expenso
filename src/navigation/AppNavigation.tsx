import {View, Text, Platform, StatusBar} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Introduction from '../screens/Introduction';
import Welcome from '../screens/Welcome';
import ForgotPassword from '../screens/ForgotPassword';
import Confirmation from '../screens/Confirmation';
import Home from '../screens/Home';
import Income from '../screens/Income';
import {AuthProvider} from './AuthStackProvider';
import Expense from '../screens/Expense';
import TabsNavigator from './TabsNavigator';
import {TabContextProvider} from '../context/TabContext';
import Transfer from '../screens/Transfer';
import Transaction from '../screens/Transaction';
import Details from '../screens/Details';
import {useSelector} from 'react-redux';

import {RootState} from '../Store/rootReducer';

export type AppNavigationParams = {
  Initial: any;
  Login: any;
  SignUp: any;
  Welcome: any;
  ForgotPassword: any;
  Confirmation: any;
  HomeTab: any;
  Expense: any;
  Income: any;
  Transfer: any;
  Transaction: any;
  Details: any;
};

const Stack = createNativeStackNavigator<AppNavigationParams>();

const AppNavigation: React.FC<AppNavigationParams> = ({}) => {
  const user = useSelector((state: RootState) => state.user);
  console.log('user in appnavigation', user);

  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }

  return (
    <AuthProvider>
      <TabContextProvider>
        <NavigationContainer>
          {user?.id ? (
            <Home />
          ) : (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Initial" component={Introduction} />
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="Confirmation" component={Confirmation} />
              <Stack.Screen name="HomeTab" component={TabsNavigator} />
              <Stack.Screen name="Expense" component={Expense} />
              <Stack.Screen name="Income" component={Income} />
              <Stack.Screen name="Transfer" component={Transfer} />
              <Stack.Screen name="Transaction" component={Transaction} />
              <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </TabContextProvider>
    </AuthProvider>
  );
};

export default AppNavigation;

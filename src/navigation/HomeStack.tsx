import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Expense from '../screens/Expense';
import Income from '../screens/Income';
import Transfer from '../screens/Transfer';
import Details from '../screens/Details';
import {HomeStackParamList} from '../interface/Navigation';

const Home_Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Home_Stack.Navigator
      initialRouteName="InitialHome"
      screenOptions={{headerShown: false}}>
      <Home_Stack.Screen name="InitialHome" component={Home} />
      <Home_Stack.Screen name="Expense" component={Expense} />
      <Home_Stack.Screen name="Income" component={Income} />
      <Home_Stack.Screen name="Transfer" component={Transfer} />
      <Home_Stack.Screen name="Details" component={Details} />
    </Home_Stack.Navigator>
  );
};

export default HomeStack;

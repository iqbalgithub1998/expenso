import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Expense from '../screens/Expense';
import Income from '../screens/Income';
import Transfer from '../screens/Transfer';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Initial" component={Home} />
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen name="Income" component={Income} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default HomeStack;

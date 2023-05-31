import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Introduction from '../screens/Introduction';
import Welcome from '../screens/Welcome';


export
type AppNavigationParams = {

"Initial": undefined
"Login": undefined
"SignUp": undefined
"Welcome": undefined
}



const Stack = createNativeStackNavigator<AppNavigationParams>();

const AppNavigation:React.FC = () => {

    return (
        
        <NavigationContainer>
          <Stack.Navigator  screenOptions={{headerShown:false}}>
            <Stack.Screen name="Initial" component={Introduction} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator> 
        </NavigationContainer>
      );
    };


export default AppNavigation;
import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import Introduction from './src/screens/Introduction'
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import AppNavigation from './src/navigation/AppNavigation'
import { StatusBar } from 'react-native'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    //<Introduction/>
    //<Login/>
    //<SignUp/>
    <>
     <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    <AppNavigation Initial={undefined} Login={undefined} SignUp={undefined} Welcome={undefined} ForgotPassword={undefined} Confirmation={undefined} Home={undefined} Expense={undefined} Income={undefined}/>
    
    </>
    
  )
}

export default App

const styles = StyleSheet.create({})
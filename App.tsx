import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Introduction from './src/screens/Introduction'
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import AppNavigation from './src/navigation/AppNavigation'
import { StatusBar } from 'react-native'


const App = () => {
  return (
    //<Introduction/>
    //<Login/>
    //<SignUp/>
    <>
    <AppNavigation/>
    <StatusBar backgroundColor={'white'}/>
    </>
    
  )
}

export default App

const styles = StyleSheet.create({})
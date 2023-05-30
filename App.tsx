import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Introduction from './src/screens/Introduction'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import Welcome from './src/screens/Welcome'
import { getDefaultMiddleware } from '@reduxjs/toolkit'

const App = () => {
  return (
    //<Introduction/>
    // <SignUp/>
    <Login/>
    //<Welcome/>

  )
}

export default App

const styles = StyleSheet.create({})
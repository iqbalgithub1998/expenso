import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Transfer = () => {
  return (
    <View style = {styles.container}>
      <Text>Transfer</Text>
    </View>
  )
}

export default Transfer

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})
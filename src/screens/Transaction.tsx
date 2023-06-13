import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TabContainer from '../components/TabContainer'
import DateSelect from '../components/Date'

const Transaction = () => {
  return (
    <TabContainer>
    <View style = {styles.container}>
      <Text>Transaction</Text>
      <DateSelect placeholder = 'Select date'/>
    </View>
    </TabContainer>
  )
}

export default Transaction

const styles = StyleSheet.create({
  container:{
    flex:1,
    //justifyContent:'center',
   // alignItems:'center'
  }
})
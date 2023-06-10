import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TabActions } from '@react-navigation/native'
import TabContainer from '../components/TabContainer'

const Profile = () => {
  return (
    <TabContainer>
    <View>
      <Text>Profile</Text>
    </View>
    </TabContainer>
  )
}

export default Profile

const styles = StyleSheet.create({})
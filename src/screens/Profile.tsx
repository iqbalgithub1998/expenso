import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TabContainer from '../components/TabContainer';
import {getUserId} from '../utils/UserID';
import firestore from '@react-native-firebase/firestore';
import {COLORS} from '../constants/theme';

const Profile = () => {
  const [loggedInUserName, setLoggedInUserName] = useState('');

  useEffect(() => {
    fetchLoggedInUserName();
  }, []);

  const fetchLoggedInUserName = async () => {
    const userId = await getUserId();
    const userSnapshot = await firestore()
      .collection('Users')
      .where('userId', '==', userId)
      .get();
    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      const {name} = userData;
      setLoggedInUserName(name);
    }
  };

  return (
    <TabContainer>
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text style={styles.heading}>Hello !!</Text>
        <Text style={styles.name}>{loggedInUserName}</Text>
      </View>
    </TabContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  heading: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 50,
    fontWeight: '800',
    color: COLORS.black,
  },
  name: {
    marginHorizontal: 20,
    fontSize: 80,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

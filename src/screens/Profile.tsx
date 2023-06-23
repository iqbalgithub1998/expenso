import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {getUserId} from '../utils/UserID';
import firestore from '@react-native-firebase/firestore';
import {COLORS} from '../constants/theme';
import {deleteAsyncStorage} from '../utils/AuthChecker';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser, updateUser} from '../Store/Slice/UserSlice';
import {RootState} from '../Store/rootReducer';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user);
  // const [loggedInUserName, setLoggedInUserName] = useState('');

  // useEffect(() => {
  //   fetchLoggedInUserName();
  // }, []);

  // const fetchLoggedInUserName = async () => {
  //   const userId = await getUserId();
  //   const userSnapshot = await firestore()
  //     .collection('Users')
  //     .where('userId', '==', userId)
  //     .get();
  //   if (!userSnapshot.empty) {
  //     const userData = userSnapshot.docs[0].data();
  //     const {name} = userData;
  //     setLoggedInUserName(name);
  //   }
  // };

  const logout = async () => {
    await deleteAsyncStorage('ExpensoUserData');
    dispatch(removeUser());
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
      <Text style={styles.heading}>Hello !!</Text>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.button}>
        <Button color="red" title="logout" onPress={logout}></Button>
      </View>
    </View>
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
  button: {
    marginTop: 15,
    alignSelf: 'center',
  },
});

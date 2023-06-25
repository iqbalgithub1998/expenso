import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {setExpenseSum, setLentSum} from '../Store/Slice/TransactionSlice';
import {RootState} from '../Store/rootReducer';

const getUserId = async () => {
  const currentUser = auth().currentUser;
  let userId = '';
  if (currentUser) {
    userId = currentUser.uid || '';
  } else {
    try {
      await GoogleSignin.hasPlayServices();
      const currentUser = await GoogleSignin.getCurrentUser();
      userId = currentUser?.user.id || '';
    } catch (error) {
      console.log('Google Sign-In error:', error);
      return error;
    }
  }
  return userId;
};

export const ExpenseValue: React.FC = () => {
  const dispatch = useDispatch();
  const fetchExpenseSum = async () => {
    try {
      const userId = await getUserId();
      const snapshot = await firestore()
        .collection('Transaction')
        .where('type', '==', 'Borrowed')
        .where('userId', '==', userId)
        .get();

      let sum = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        const expense = data?.expense;
        if (typeof expense === 'number') {
          sum += expense;
        }
      });

      //setExpenseSum(sum);
      dispatch(setExpenseSum(sum));
    } catch (error) {
      console.log('Error fetching expense sum:', error);
      return error;
    }
  };

  const expenseSum = useSelector(
    (state: RootState) => state.transaction.expenseSum,
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchExpenseSum();
    }, []),
  );
  return <Text>₹ {expenseSum}</Text>;
};

export const LentValue: React.FC = () => {
  //const [lentSum, setLentSum] = useState<number>(0);
  const dispatch = useDispatch();
  const fetchLentSum = async () => {
    try {
      const userId = await getUserId();
      const snapshot = await firestore()
        .collection('Transaction')
        .where('type', '==', 'Lent')
        .where('userId', '==', userId)
        .get();

      let sum = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        const expense = data?.expense;
        if (typeof expense === 'number') {
          sum += expense;
        }
      });
      dispatch(setLentSum(sum));
      //setLentSum(sum);
    } catch (error) {
      console.log('Error fetching expense sum:', error);
      return error;
    }
  };

  const lentSum = useSelector((state: RootState) => state.transaction.lentSum);

  useFocusEffect(
    React.useCallback(() => {
      fetchLentSum();
    }, []),
  );

  return <Text>₹ {lentSum}</Text>;
};

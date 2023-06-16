import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export const ExpenseValue: React.FC = () => {
  const [expenseSum, setExpenseSum] = useState<number>(0);

  const fetchExpenseSum = async () => {
    try {
      const snapshot = await firestore()
        .collection('Transaction')
        .where('type', '==', 'Borrowed')
        .get();

      let sum = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        const expense = data?.expense;
        if (typeof expense === 'number') {
          sum += expense;
        }
      });

      setExpenseSum(sum);
    } catch (error) {
      console.log('Error fetching expense sum:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchExpenseSum();
    }, []),
  );

  return <Text>₹ {expenseSum}</Text>;
};

export const LentValue: React.FC = () => {
  const [lentSum, setLentSum] = useState<number>(0);

  const fetchLentSum = async () => {
    try {
      const snapshot = await firestore()
        .collection('Transaction')
        .where('type', '==', 'Lent')
        .get();

      let sum = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        const expense = data?.expense;
        if (typeof expense === 'number') {
          sum += expense;
        }
      });

      setLentSum(sum);
    } catch (error) {
      console.log('Error fetching expense sum:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchLentSum();
    }, []),
  );

  return <Text>₹ {lentSum}</Text>;
};

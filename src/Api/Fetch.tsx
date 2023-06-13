
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const ExpenseValue: React.FC = () => {
    const [expenseSum, setExpenseSum] = useState<number>(0);
  
    useEffect(() => {
      const fetchExpenseSum = async () => {
        try {
          const snapshot = await firestore().collection('Borrowed').get();
  
          let sum = 0;
          snapshot.forEach((doc) => {
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
  
      fetchExpenseSum();
    },);


  return (
    <Text>₹ {expenseSum}</Text>
  );
};


export const LentValue: React.FC = () => {
    const [lentSum, setLentSum] = useState<number>(0);
  
    useEffect(() => {
        const fetchLentSum = async () => {
          try {
            const snapshot = await firestore().collection('Lent').get();
    
            let sum = 0;
            snapshot.forEach((doc) => {
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
    
        fetchLentSum();
      });
  
  
    return (
      <Text>₹ {lentSum}</Text>
    );
  };


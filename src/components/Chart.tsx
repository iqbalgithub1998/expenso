import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {Categories} from '../constants/Categories';
import firestore from '@react-native-firebase/firestore';
import {getUserId} from '../utils/UserID';

const fetchTransactions = async () => {
  try {
    const userId = await getUserId();
    const snapshot = await firestore()
      .collection('Transaction')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    const data = snapshot.docs.map(doc => doc.data());

    return data;
  } catch (error) {
    console.log('Error fetching transactions:', error);
    return [];
  }
};

const TransactionPieChart = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactions();
      setTransaction(data);
    };

    fetchData();
  }, []);

  const calculateCategoryPercentages = () => {
    const categoryCounts = {};
    const totalTransactions = transaction.length;

    transaction.forEach(trans => {
      const category = trans.category;
      if (category) {
        // Add a check to ensure the category exists
        if (categoryCounts.hasOwnProperty(category)) {
          categoryCounts[category] += 1;
        } else {
          categoryCounts[category] = 1;
        }
      }
    });

    const categoryPercentages = {};
    Object.keys(categoryCounts).forEach(category => {
      const count = categoryCounts[category];
      const percentage = (count / totalTransactions) * 100;
      categoryPercentages[category] = percentage.toFixed(2);
    });

    return categoryPercentages;
  };

  // Rest of the code remains unchanged...
};

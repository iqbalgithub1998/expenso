import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import 'firebase/firestore';
export const uploadExpenseData = async (expenseData: any) => {
  try {
    // Get a reference to the Firestore collection
    const expensesRef = firebase.firestore().collection('Borrowed');

    // Create a new document with the expense data
    await expensesRef.add(expenseData);

    // Upload successful
    console.log('Expense data uploaded successfully');
  } catch (error) {
    // Handle errors
    console.error('Error uploading expense data:', error);
  }
};

import firebase from '@react-native-firebase/app';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';



export const uploadExpenseData = async (
  expense: number,
  category: string,
  transactionType: string,
  description: string,
  deadline: string
) => {
  firestore()
  .collection('Borrowed')
  .add({
    expense,
    category,
    transactionType,
    description,
    deadline,
    createdAt: firestore.FieldValue.serverTimestamp(),
  })
  .then(() => {
    console.log('Borrowed info added!');
  });
};



export const uploadIncomeData = async (
  expense: number,
  category: string,
  transactionType: string,
  description: string,
  deadline: string
) => {
  firestore()
  .collection('Lent')
  .add({
    expense,
    category,
    transactionType,
    description,
    deadline,
    createdAt: firestore.FieldValue.serverTimestamp(),
  })
  .then(() => {
    console.log('Lent info  added!');
  });
};

export const uploadTransferData = async (
  expenseValue:number,
  senderValue:string,
  receiverValue:string,
  descriptionValue:string,
  dateValue:string,
) => {
  firestore()
  .collection('Transfer')
  .add({
    expenseValue,
    senderValue,
    receiverValue,
    descriptionValue,
    dateValue,
    createdAt: firestore.FieldValue.serverTimestamp(),
  })
  .then(() => {
    console.log('Transfer info added!');
  });
};

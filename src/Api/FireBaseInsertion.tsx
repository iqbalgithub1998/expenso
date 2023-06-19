import firebase from '@react-native-firebase/app';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const uploadCustomData = async (
  userId: string,
  expense: number,
  category: string,
  transactionType: string,
  description: string,
  deadline: string,
  type: string,
) => {
  firestore()
    .collection('Transaction')
    .add({
      userId,
      expense,
      category,
      transactionType,
      description,
      deadline,
      type,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log('Info added!');
    });
};

// export const uploadIncomeData = async (
//   expense: number,
//   category: string,
//   transactionType: string,
//   description: string,
//   deadline: string
// ) => {
//   firestore()
//   .collection('Lent')
//   .add({
//     expense,
//     category,
//     transactionType,
//     description,
//     deadline,
//     createdAt: firestore.FieldValue.serverTimestamp(),
//   })
//   .then(() => {
//     console.log('Lent info  added!');
//   });
// };

export const uploadTransferData = async (
  userId: string,
  expenseValue: number,
  senderValue: string,
  receiverValue: string,
  descriptionValue: string,
  dateValue: string,
) => {
  firestore()
    .collection('Transfer')
    .add({
      userId,
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

import firebase from '@react-native-firebase/app';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';



// export const uploadCustomData = async (
//   expense: number,
//   category: string,
//   transactionType: string,
//   description: string,
//   deadline: string,
//   type : string
// ) => {
//   firestore()
//   .collection('Transaction')
//   .add({
//     expense,
//     category,
//     transactionType,
//     description,
//     deadline,
//     type,
//     //createdAt: firestore.FieldValue.serverTimestamp(),
//   })
//   .then(() => {
//     console.log('Info added!');
//   });
// };
export const uploadCustomData = async (
  expense: number,
  category: string,
  transactionType: string,
  description: string,
  deadline: string,
  type: string
) => {
  try {
    await firestore().collection('Transaction').add({
      expense,
      category,
      transactionType,
      description,
      deadline,
      type,
    });
    console.log('Info added!');
  } catch (error) {
    console.log('Error adding info:', error);
  }
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

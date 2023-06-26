import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface UserInterface {
  userId: string | null;
  name: string | null;
  email: string | null;
}

export interface TransactionItemProps {
  id: string;
  expense: number;
  description: string;
  deadline: string;
  type: string;
  category: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
  method: string;
}

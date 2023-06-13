import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth'
import 'firebase/firestore';

// Initialize Firebase with your project config
const firebaseConfig = {
    apiKey: "AIzaSyDYmQhkNCx2a7c8_SWqt3LQ3wqH_Qr4nsA",
    authDomain: "expenso-76570.firebaseapp.com",
    projectId: "expenso-76570",
    storageBucket: "expenso-76570.appspot.com",
    messagingSenderId: "765373708472",
    appId: "1:765373708472:web:bb4913c7b0baca4bde9c4d",
    measurementId: "G-L8D2W3NQLS"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


  

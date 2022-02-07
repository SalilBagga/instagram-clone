import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyA-oVZ7jfQFqkjeQwzTxM873B8aDDVowus',
  authDomain: 'instagram-clone-4b403.firebaseapp.com',
  projectId: 'instagram-clone-4b403',
  storageBucket: 'instagram-clone-4b403.appspot.com',
  messagingSenderId: '37506377038',
  appId: '1:37506377038:web:2dbb61215430f950b86a1f',
  measurementId: 'G-LWZGY40JTB',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

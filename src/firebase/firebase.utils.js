import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  // apiKey: 'AIzaSyCdHT-AYHXjF7wOrfAchX4PIm3cSj5tn14',
  // authDomain: 'crwn-db.firebaseapp.com',
  // databaseURL: 'https://crwn-db.firebaseio.com',
  // projectId: 'crwn-db',
  // storageBucket: 'crwn-db.appspot.com',
  // messagingSenderId: '850995411664',
  // appId: '1:850995411664:web:7ddc01d597846f65'
    apiKey: "AIzaSyBbpv3O6w0HWvGdKLMUo2aGq3aLvJMuvgE",
    authDomain: "crwn-db-64fe5.firebaseapp.com",
    projectId: "crwn-db-64fe5",
    storageBucket: "crwn-db-64fe5.appspot.com",
    messagingSenderId: "19397344193",
    appId: "1:19397344193:web:af681b7eda5f6edbddcd40",
    measurementId: "G-0PHLVKCR6P",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
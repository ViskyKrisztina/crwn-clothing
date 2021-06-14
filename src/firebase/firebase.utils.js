import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBN8jJcDanceppdYJQy3U_KrLqcmFpw_m4",
    authDomain: "crwn-db-3c6b5.firebaseapp.com",
    projectId: "crwn-db-3c6b5",
    storageBucket: "crwn-db-3c6b5.appspot.com",
    messagingSenderId: "169973515023",
    appId: "1:169973515023:web:fe61d67339bb4ea7b8747a",
    measurementId: "G-248Z9DDP4D"
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
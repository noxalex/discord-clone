import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDH1_sEhQ3Z5FGOV7jpgas6oVDd26Wuefc',
  authDomain: 'discord-clone-ccb5c.firebaseapp.com',
  projectId: 'discord-clone-ccb5c',
  storageBucket: 'discord-clone-ccb5c.appspot.com',
  messagingSenderId: '1048731863315',
  appId: '1:1048731863315:web:3be2d06bb7071307f872e6',
  measurementId: 'G-C8FG5VNNSD',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

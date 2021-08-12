import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbIRPR39TbPYBKN9qQaoJknneAJN15RLg",
    authDomain: "todoapp-5f7ea.firebaseapp.com",
    projectId: "todoapp-5f7ea",
    storageBucket: "todoapp-5f7ea.appspot.com",
    messagingSenderId: "870372862685",
    appId: "1:870372862685:web:18bb080aad76307e6f4934",
    measurementId: "G-DJJZSKZEQ4"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
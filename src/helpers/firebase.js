import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
        apiKey: "AIzaSyCZZgxh3tDa8OAFJCKCHRj_8q3JW2FW0Ho",
        authDomain: "kards-90223.firebaseapp.com",
        databaseURL: "https://kards-90223.firebaseio.com",
        storageBucket: "kards-90223.appspot.com",
        messagingSenderId: "600593412749"
    };
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
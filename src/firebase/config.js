import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNhhNMgEQG2R-oRCk4_zBWuFRV5ikdE4U",
    authDomain: "olx-clone-2088c.firebaseapp.com",
    projectId: "olx-clone-2088c",
    storageBucket: "olx-clone-2088c.appspot.com",
    messagingSenderId: "894801303925",
    appId: "1:894801303925:web:6e550f15890a6be7841b3c",
    measurementId: "G-LXF6PQ4Q6E"
};

export default firebase.initializeApp(firebaseConfig)
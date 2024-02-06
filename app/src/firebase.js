import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from 'firebase/firestore'; // Adjusted import for Firestore module
import { getStorage } from 'firebase/storage'; // Adjusted import for Storage module

const firebaseConfig = {
  apiKey: "AIzaSyCrudXhT5ZQSYHs382LF5lyXV6GA3-yKtM",
  authDomain: "web-based-airdrop.firebaseapp.com",
  databaseURL: "https://web-based-airdrop-default-rtdb.firebaseio.com",
  projectId: "web-based-airdrop",
  storageBucket: "web-based-airdrop.appspot.com",
  messagingSenderId: "147452532990",
  appId: "1:147452532990:web:975d54e8e4d5613ad4adaf",
  measurementId: "G-PS6GJB214P"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(); // Access storage using getStorage method
const firestore = getFirestore(app); // Access firestore using getFirestore method
//const myDocument = doc(firestore, 'myCollection', 'myDocumentId');


export { app, analytics, storage, firestore }; 





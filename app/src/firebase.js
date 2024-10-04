import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from 'firebase/firestore'; // Adjusted import for Firestore module
import { getStorage } from 'firebase/storage'; // Adjusted import for Storage module

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(); // Access storage using getStorage method
const firestore = getFirestore(app); // Access firestore using getFirestore method
//const myDocument = doc(firestore, 'myCollection', 'myDocumentId');


export default { app, analytics, storage, firestore }; 





// firebase.js
import { initializeApp } from 'firebase/app';

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

export default app;

import {initializeApp} from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyAtZ4VgjYfQRiqpuNORdjhe3-8WGeyL0jU",
    authDomain: "fitness-enthusiast.firebaseapp.com",
    databaseURL: "https://fitness-enthusiast-default-rtdb.firebaseio.com",
    projectId: "fitness-enthusiast",
    storageBucket: "fitness-enthusiast.appspot.com",
    messagingSenderId: "689427527272",
    appId: "1:689427527272:web:dd4f7a07552e4f12bdeddd",
    measurementId: "G-NC22BSVL4L"
  };
const App=initializeApp(firebaseConfig);
const db=getDatabase(App);
export default db
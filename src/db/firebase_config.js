import {initializeApp} from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAA9wUUtVFxHbwIm7N39dxhXGBPun-hBu0",
  authDomain: "fitness-enthusiasts.firebaseapp.com",
  databaseURL: "https://fitness-enthusiasts-default-rtdb.firebaseio.com",
  projectId: "fitness-enthusiasts",
  storageBucket: "fitness-enthusiasts.appspot.com",
  messagingSenderId: "1088101595044",
  appId: "1:1088101595044:web:f69220481e955f086ab331",
  measurementId: "G-JPNNSXCDRF"
};
const App=initializeApp(firebaseConfig);
const db=getDatabase(App);
const storage=getStorage(App)
export {db,storage};
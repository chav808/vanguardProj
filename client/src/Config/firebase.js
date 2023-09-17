import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, updateDoc} from 'firebase/firestore';
import { collection , getDocs} from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDtIrrttapdDj0SPS2u7kY7vcdNTYSjn4k",
  authDomain: "brokestudent-ed651.firebaseapp.com",
  projectId: "brokestudent-ed651",
  storageBucket: "brokestudent-ed651.appspot.com",
  messagingSenderId: "32414295468",
  appId: "1:32414295468:web:04cc1163e5c626b86cc609"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, signInWithEmailAndPassword, app, db, storage, collection, getDocs, doc, updateDoc, ref, uploadBytes, getDownloadURL};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd21_d1DLd-im-kEv3jP9LiHihNFKUFsY",
  authDomain: "fvent-6ccc1.firebaseapp.com",
  projectId: "fvent-6ccc1",
  storageBucket: "fvent-6ccc1.firebasestorage.app",
  messagingSenderId: "552375546071",
  appId: "1:552375546071:web:9f4a73fcfae237de040092",
  measurementId: "G-TMZLVNME6T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

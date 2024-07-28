import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAZCE93XMtZTwIk0MFjGcR5SHMZZImggJM",
  authDomain: "crud-4d6d0.firebaseapp.com",
  projectId: "crud-4d6d0",
  storageBucket: "crud-4d6d0.appspot.com",
  messagingSenderId: "685484503324",
  appId: "1:685484503324:web:cffc244cb3dbb32b1d8ad9",
  databaseURL: "https://crud-4d6d0-default-rtdb.firebaseio.com", // Asegúrate de incluir la URL de tu base de datos
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { auth, db, rtdb, app };

import { initializeApp } from "firebase/app";
// import { initializeAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,  
  appId: process.env.APPID
};

const app = initializeApp(firebaseConfig);

// Inicializando Auth, Database e Firestore
const auth = getAuth(app);
const db = getDatabase(app);

// Exportando os serviços
export { db, auth };

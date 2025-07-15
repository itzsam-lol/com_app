/// <reference types="vite/client" />
// (The above line ensures import.meta.env is typed for Vite projects)
// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCsl3ts5r5VP27MqdqEUwCU9QMpd9kO9uA",
  authDomain: "comhelperai.firebaseapp.com",
  projectId: "comhelperai",
  storageBucket: "comhelperai.firebasestorage.app",
  messagingSenderId: "651523617038",
  appId: "1:651523617038:web:e582f3c344b2b5b26e675f",
  measurementId: "G-J66396S195"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export const getUserData = async (uid: string) => {
  const userDoc = doc(db, 'users', uid);
  const snap = await getDoc(userDoc);
  return snap.exists() ? snap.data() : null;
};

export const setUserData = async (uid: string, data: DocumentData) => {
  const userDoc = doc(db, 'users', uid);
  await setDoc(userDoc, data, { merge: true });
};

// Storage helpers
export const uploadFile = async (path: string, file: File) => {
  const fileRef = storageRef(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

export const deleteFile = async (path: string) => {
  const fileRef = storageRef(storage, path);
  await deleteObject(fileRef);
};

export { app, auth, provider, db, storage };
  
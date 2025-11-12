import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsbUaRDIABbAhcp8Sli4mbCCNrYsWgYF4",
  authDomain: "edulearnza.firebaseapp.com",
  projectId: "edulearnza",
  storageBucket: "edulearnza.firebasestorage.app",
  messagingSenderId: "695718678141",
  appId: "1:695718678141:web:6cf9123b170464b341eb14",
  measurementId: "G-HPRRDGSYCV",
};

// Initialize Firebase only if it hasn't been initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log("✅ Firebase initialized successfully");
} else {
  app = getApp();
}

// Initialize Auth with persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // If auth is already initialized, get the existing instance
  auth = getAuth(app);
}

// Initialize Firestore with offline persistence
let db;
try {
  db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  });
} catch (error) {
  // If Firestore is already initialized, get the existing instance
  db = getFirestore(app);
}

export { auth, db };

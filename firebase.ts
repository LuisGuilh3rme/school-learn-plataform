import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = Constants.expoConfig?.extra?.firebaseApiKey;
const messagingSenderId = Constants.expoConfig?.extra?.firebaseMessagingId;
const appId = Constants.expoConfig?.extra?.firebaseAppId;

const firebaseConfig = {
  apiKey,
  authDomain: "school-learn-plataform.firebaseapp.com",
  projectId: "school-learn-plataform",
  storageBucket: "school-learn-plataform.appspot.com",
  messagingSenderId,
  appId,
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

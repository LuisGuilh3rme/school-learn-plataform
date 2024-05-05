import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = Constants.expoConfig?.extra?.firebaseApiKey;
const messagingSenderId = Constants.expoConfig?.extra?.firebaseMessagingId;
const appId = Constants.expoConfig?.extra?.firebaseAppId;

const firebaseConfig = {
  apiKey,
  authDomain: "poc-school-learn-plataform.firebaseapp.com",
  projectId: "poc-school-learn-plataform",
  storageBucket: "poc-school-learn-plataform.appspot.com",
  messagingSenderId,
  appId,
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

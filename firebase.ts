import Constants from "expo-constants";
import { initializeApp } from "firebase/app";

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

initializeApp(firebaseConfig);

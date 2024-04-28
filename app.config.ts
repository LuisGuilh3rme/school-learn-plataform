import { ExpoConfig, ConfigContext } from "expo/config";

const firebaseAppId =
  process.env.FIREBASE_API_ID ?? process.env.EXPO_PUBLIC_FIREBASE_APP_ID;
const firebaseApiKey =
  process.env.FIREBASE_API_KEY ?? process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
const firebaseMessagingId =
  process.env.FIREBASE_MESSAGING_ID ??
  process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_ID;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "school-learn-plataform",
  slug: "school-learn-plataform",
  extra: {
    firebaseAppId,
    firebaseApiKey,
    firebaseMessagingId,
    eas: {
      projectId: "21fda8ed-7351-4728-bf98-25f50940e5eb",
    },
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

import AvatarReducer from "./src/shared/reducers/Avatar.reducer";
import CoordinatesReducer from "./src/shared/reducers/Coordinates.reducer";
import themeReducer from "./src/shared/reducers/Theme.reducer";

const reducers = combineReducers({
  isDarkTheme: themeReducer,
  avatar: AvatarReducer,
  coordinates: CoordinatesReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["coordinates"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { store, RootState, AppDispatch };

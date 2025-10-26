import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import propertiesReducer from "./propertiesSlice.js";
import { storageKeys, writeLS } from "../utils/storage.js";

// פונקציה: יצירת store ואיחוד reducers.
// configureStore אוטומטית מגדיר Redux DevTools ו-middleware.
const store = configureStore({
  reducer: { auth: authReducer, properties: propertiesReducer },
});

// פונקציה: האזנה ושמירה ל-localStorage על שינויים רלוונטיים.
// subscribe נקרא אחרי כל dispatch ובודק אם יש שינוי ב-state.
let prev = store.getState();
store.subscribe(() => {
  const state = store.getState();

  // שמירת נתוני אימות אם השתנו
  if (state.auth !== prev.auth) {
    writeLS(storageKeys.users, state.auth.users);
    writeLS(storageKeys.session, state.auth.session);
  }

  // שמירת נכסים אם השתנו
  if (state.properties !== prev.properties) {
    writeLS(storageKeys.assets, state.properties.assets);
  }

  prev = state; // עדכון הייחוס לבדיקה הבאה
});

export default store;

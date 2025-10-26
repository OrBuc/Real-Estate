import { createSlice } from "@reduxjs/toolkit";
import { storageKeys, readLS } from "../utils/storage.js";

// טעינת נתונים מ-localStorage (אם קיימים)
const initialState = {
  users: readLS(storageKeys.users, []),
  session: readLS(storageKeys.session, null),
}; // { userId }

// פונקציה: יצירת slice עם reducers עבור משתמשים.
// createSlice מפשט את יצירת actions ו-reducers ביחד.
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // פונקציה: רישום משתמש חדש ושמירתו ב-state.
    // זורק Error אם אימייל כבר קיים (Component צריך לתפוס try-catch).
    register(state, action) {
      const { username, email, password } = action.payload;

      // בדיקה אם אימייל כבר קיים (case-insensitive)
      const exists = state.users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) throw new Error("אימייל כבר קיים");

      // יצירת משתמש חדש עם ID ייחודי (timestamp)
      const user = { id: Date.now().toString(), username, email, password };
      state.users.push(user);
      // לא מתחבר אוטומטית - המשתמש צריך לעשות login
    },

    // פונקציה: התחברות משתמש ועדכון session.
    // זורק Error אם האימייל או סיסמה שגויים.
    login(state, action) {
      const { email, password } = action.payload;

      // חיפוש משתמש עם אימייל וסיסמה תואמים
      const user = state.users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );
      if (!user) throw new Error("אימייל או סיסמה שגויים");

      // שמירת ה-userId ב-session
      state.session = { userId: user.id };
    },

    // פונקציה: התנתקות המשתמש וניקוי session.
    // המשתמשים נשארים ב-users, רק ה-session מתנקה.
    logout(state) {
      state.session = null;
    },
  },
});

export const { register, login, logout } = slice.actions;
export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { storageKeys, readLS } from "../utils/storage.js";

// נתוני seed - 3 נכסים לדוגמה עם תמונות מ-Unsplash
const seedAssets = [
  {
    id: "s1",
    userId: "seed",
    title: "דופלקס יוקרתי בבת ים",
    price: 2500000,
    location: "בת ים",
    description: "5 חדרים, קו שני לים",
    status: "זמין",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1080&auto=format&fit=crop&q=80",
  },
  {
    id: "s2",
    userId: "seed",
    title: "בית פרטי לשימור בירושלים",
    price: 7000000,
    location: "ירושלים",
    description: "נדיר ביופיו",
    status: "זמין",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1080&auto=format&fit=crop&q=80",
  },
  {
    id: "s3",
    userId: "seed",
    title: "פנטהאוז בהרצליה המרינה",
    price: 5200000,
    location: "הרצליה",
    description: "נוף פתוח לים",
    status: "זמין",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1080&auto=format&fit=crop&q=80",
  },
];

// פונקציה: טעינת נכסים התחלתיים (מ-localStorage או seed).
// אם localStorage ריק או לא תקין, מחזיר את ה-seed.
function getInitialAssets() {
  const existing = readLS(storageKeys.assets, []);
  if (Array.isArray(existing) && existing.length) return existing;
  return seedAssets;
}

const initialState = { assets: getInitialAssets() };

// פונקציה: יצירת slice לניהול נכסים והגדרת reducers.
// כל reducer מקבל state (מוטציה ישירה בזכות Immer) ו-action.
const slice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    // פונקציה: הוספת נכס חדש ל-state.
    // ID נוצר מ-timestamp כדי להיות ייחודי.
    addProperty(state, action) {
      const { userId, title, price, location, description, status, image } =
        action.payload;
      state.assets.push({
        id: Date.now().toString(), // ID ייחודי
        userId,
        title,
        price: Number(price), // המרה למספר
        location,
        description: description || "", // ברירת מחדל לשדה אופציונלי
        status: status || "זמין",
        image: image || "",
      });
    },

    // פונקציה: עדכון נכס קיים לפי מזהה.
    // updates יכול להכיל שדה אחד או יותר לעדכון.
    updateProperty(state, action) {
      const { id, updates } = action.payload;
      const idx = state.assets.findIndex((a) => a.id === id);
      if (idx !== -1) {
        // מיזוג הנכס הישן עם השינויים החדשים
        state.assets[idx] = { ...state.assets[idx], ...updates };
      }
    },

    // פונקציה: מחיקת נכס לפי מזהה.
    // משתמש ב-filter ליצירת מערך חדש בלי הנכס.
    deleteProperty(state, action) {
      const id = action.payload;
      state.assets = state.assets.filter((a) => a.id !== id);
    },

    // פונקציה: החלפת סטטוס נכס בין 'זמין' ל-'נמכר'.
    // שימושי לכפתור "שנה סטטוס" מהיר.
    toggleStatus(state, action) {
      const id = action.payload;
      const item = state.assets.find((a) => a.id === id);
      if (item) {
        item.status = item.status === "זמין" ? "נמכר" : "זמין";
      }
    },
  },
});

export const { addProperty, updateProperty, deleteProperty, toggleStatus } =
  slice.actions;
export default slice.reducer;

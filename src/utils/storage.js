export const storageKeys = {
  users: "mvp.users",
  session: "mvp.session",
  assets: "mvp.assets",
};

// פונקציה: קריאה מאובטחת של ערך מ-localStorage עם fallback.
// אם הקריאה נכשלת (למשל, JSON לא תקין), מחזיר את fallback.
export const readLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback; // במקרה של שגיאה, החזר ברירת מחדל
  }
};

// פונקציה: כתיבת ערך ל-localStorage עם JSON.stringify.
// מתעלם מ-errors (למשל, אם אין מקום או private mode).
export const writeLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // לא עושים כלום אם הכתיבה נכשלה
  }
};

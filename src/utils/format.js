// פונקציה: פורמט מספר למטבע ₪ לפי he-IL.
// מקבל מספר, מחזיר string מעוצב עם פסיקים וסימן ₪.
export const formatCurrencyILS = (num) => {
  // בדיקת קלט תקין
  if (num === null || num === undefined || isNaN(num)) return "₪0";

  const n = Number(num); // המרה למספר

  // פורמט לפי locale ישראלי + הוספת סימן ₪ בסוף
  return new Intl.NumberFormat("he-IL").format(n) + " ₪";
};

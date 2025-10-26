// פונקציה: יצירת תמונת placeholder (SVG Data URL) לפי seed.
// מחזירה string שאפשר לשים ב-src של תג img.
export const placeholder = (seed) => {
  // מערך של 5 זוגות צבעים לגרדיאנט
  const colors = [
    ["#0a66c2", "#5fa2e6"],
    ["#0a2540", "#3b73a7"],
    ["#1f7a8c", "#6fb1bf"],
    ["#006e6d", "#4db6ac"],
    ["#3f51b5", "#7986cb"],
  ];

  // המרת seed למספר: סכום ערכי ASCII של כל התווים
  const idx =
    Math.abs(
      seed
        ? String(seed)
            .split("") // פיצול לתווים
            .reduce((a, c) => a + c.charCodeAt(0), 0) // סכום ASCII
        : 0
    ) % colors.length; // modulo למניעת חריגה מהמערך

  const [c1, c2] = colors[idx]; // בחירת זוג צבעים

  // יצירת קוד SVG עם גרדיאנט ליניארי וטקסט
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='${c1}'/><stop offset='100%' stop-color='${c2}'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><g fill='white' font-family='Arial,Helvetica,sans-serif' font-size='46' font-weight='700'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'>תמונה</text></g></svg>`;

  // המרה ל-Data URL (קידוד URI)
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

import React, { useState, useEffect } from "react";
import styles from "./PropertyForm.module.css";

// אובייקט שגיאות ריק (ברירת מחדל)
const defaultErrors = { title: "", price: "", location: "", status: "" };

// פונקציה: קומפוננטת טופס נכס עם ולידציה והעלאת תמונה.
export default function PropertyForm({ initial, onCancel, onSubmit }) {
  // State עבור שדות הטופס
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    status: "זמין",
    image: "",
  });

  // State עבור הודעות שגיאה
  const [errors, setErrors] = useState(defaultErrors);

  // פונקציה: טעינת ערכי עריכה אם התקבל נכס קיים.
  // useEffect רץ כשה-initial משתנה (מעריכה לנכס אחר).
  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        price: String(initial.price ?? ""), // המרה ל-string לשדה קלט
        location: initial.location || "",
        description: initial.description || "",
        status: initial.status || "זמין",
        image: initial.image || "",
      });
    }
  }, [initial]);

  // פונקציה: ולידציה של שדות חובה ומחיר חיובי.
  // מחזירה true אם הכל תקין, false אם יש שגיאות.
  const validate = () => {
    const e = { ...defaultErrors };

    // בדיקת שדות טקסט
    if (!form.title.trim()) e.title = "כותרת היא שדה חובה";
    if (!form.location.trim()) e.location = "מיקום הוא שדה חובה";

    // בדיקת מחיר - חייב להיות מספר חיובי
    const num = Number(form.price);
    if (!form.price || isNaN(num) || num <= 0)
      e.price = "מחיר חייב להיות מספר חיובי";

    if (!form.status) e.status = "בחר סטטוס";

    setErrors(e);

    // בדיקה אם אין שגיאות (כל הערכים ריקים)
    return Object.values(e).every((v) => !v);
  };

  // פונקציה: עדכון state לפי שינוי שדה.
  // משתמש ב-name של הקלט לעדכון הנכון.
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // פונקציה: קריאת קובץ תמונה ל-Data URL ושמירתו בטופס.
  // FileReader API מאפשר קריאה אסינכרונית של קבצים.
  const handleFile = (ev) => {
    const file = ev.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    // onload נקרא אחרי סיום הקריאה
    reader.onload = () =>
      setForm((prev) => ({ ...prev, image: reader.result }));

    // התחלת קריאה והמרה ל-Data URL (base64)
    reader.readAsDataURL(file);
  };

  // פונקציה: שליחת הטופס – ולידציה ואז העברת הנתונים ל-onSubmit.
  const handleSubmit = (ev) => {
    ev.preventDefault(); // מונע רענון דף

    if (!validate()) return; // אם יש שגיאות, עצור

    // העברת נתונים נקיים ל-parent
    onSubmit({
      title: form.title.trim(),
      price: Number(form.price),
      location: form.location.trim(),
      description: form.description.trim(),
      status: form.status,
      image: form.image,
    });
  };

  return (
    <form onSubmit={handleSubmit} aria-label="טופס נכס">
      {/* כותרת דינמית - "עריכה" או "הוספה" */}
      <div className={styles.title}>
        {initial ? "עריכת נכס" : "הוספת נכס חדש"}
      </div>

      {/* שדה כותרת */}
      <div className="formRow">
        <label htmlFor="title">כותרת</label>
        <input
          id="title"
          name="title"
          className="input"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>

      {/* שדה מחיר */}
      <div className="formRow">
        <label htmlFor="price">מחיר (₪)</label>
        <input
          id="price"
          name="price"
          className="input"
          value={form.price}
          onChange={handleChange}
          inputMode="numeric"
        />
        {errors.price && <div className="error">{errors.price}</div>}
      </div>

      {/* שדה מיקום */}
      <div className="formRow">
        <label htmlFor="location">מיקום</label>
        <input
          id="location"
          name="location"
          className="input"
          value={form.location}
          onChange={handleChange}
        />
        {errors.location && <div className="error">{errors.location}</div>}
      </div>

      {/* שדה תיאור (אופציונלי) */}
      <div className="formRow">
        <label htmlFor="description">תיאור (אופציונלי)</label>
        <textarea
          id="description"
          name="description"
          className="input"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      {/* בחירת סטטוס */}
      <div className="formRow">
        <label htmlFor="status">סטטוס</label>
        <select
          id="status"
          name="status"
          className="input"
          value={form.status}
          onChange={handleChange}
        >
          <option value="זמין">זמין</option>
          <option value="נמכר">נמכר</option>
        </select>
        {errors.status && <div className="error">{errors.status}</div>}
      </div>

      {/* העלאת תמונה */}
      <div className="formRow">
        <label htmlFor="image">תמונת נכס (אופציונלי)</label>
        <input
          id="image"
          type="file"
          accept="image/*" // רק תמונות
          className="input"
          onChange={handleFile}
        />
        {/* תצוגה מקדימה אם יש תמונה */}
        {form.image && (
          <img src={form.image} alt="תצוגה מקדימה" className={styles.preview} />
        )}
      </div>

      {/* כפתורי פעולה */}
      <div className={styles.actions}>
        <button type="submit" className="btn">
          {initial ? "שמור" : "הוסף נכס"}
        </button>
        <button type="button" className="btn secondary" onClick={onCancel}>
          בטל
        </button>
      </div>
    </form>
  );
}

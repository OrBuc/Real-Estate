// פונקציה: Publish – פרסום נכס (טופס) למשתמש מחובר.
import React, { useState } from "react";
import styles from "./Publish.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropertyForm from "../../components/PropertyForm/PropertyForm.jsx";
import { addProperty } from "../../store/propertiesSlice.js";
import { toast } from "react-toastify";

export default function Publish() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((s) => s.auth.session?.userId);
  const [key, setKey] = useState(Date.now());

  // פונקציה: שליחת טופס – יצירת נכס והודעת הצלחה.
  const handleSubmit = (data) => {
    if (!userId) {
      toast.error("יש להתחבר כדי לפרסם נכס");
      return;
    }
    dispatch(addProperty({ userId, ...data }));
    toast.success("הנכס פורסם בהצלחה! מעבר לדף הנכסים שלך...");
    // ניקוי הטופס על ידי החלפת המפתח
    setKey(Date.now());
    // מעבר לדשבורד אחרי שנייה
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  // פונקציה: הצגת הודעה למשתמש לא מחובר.
  if (!userId) {
    return (
      <div className={styles.wrap}>
        <div className={styles.notice}>
          <h2>פרסום נכס דורש התחברות</h2>
          <p>כדי לפרסם נכס, עליך להיות מחובר למערכת.</p>
          <div className={styles.actions}>
            <Link to="/login" className="btn">
              התחבר
            </Link>
            <Link to="/register" className="btn secondary">
              הרשם
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h2>פרסם נכס</h2>
      <PropertyForm
        key={key}
        onCancel={() => navigate(-1)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

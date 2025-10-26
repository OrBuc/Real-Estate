import React from "react";
import styles from "./PropertyCard.module.css";
import { formatCurrencyILS } from "../../utils/format.js";
import { placeholder } from "../../utils/images.js";

// פונקציה: קומפוננטת כרטיס נכס - הצגה ופעולות.
export default function PropertyCard({ item, onEdit, onDelete, onToggle }) {
  // בחירת מקור התמונה: item.image או placeholder
  const src = item.image || placeholder(item.id);

  return (
    <div
      className={styles.card}
      role="article"
      aria-label={`נכס ${item.title}`}
    >
      {/* תמונת הנכס עם fallback ל-placeholder */}
      <img
        src={src}
        alt={item.title}
        className={styles.thumb}
        onError={(e) => {
          // במקרה שהתמונה לא נטענה, החלף ל-placeholder
          e.currentTarget.onerror = null; // מונע לולאה אינסופית
          e.currentTarget.src = placeholder(item.id);
        }}
      />

      {/* תוכן הכרטיס */}
      <div className={styles.box}>
        {/* שורה עליונה: כותרת + badge סטטוס */}
        <div className={styles.header}>
          <div className={styles.title}>{item.title}</div>
          <span className={`badge ${item.status === "נמכר" ? "sold" : ""}`}>
            {item.status}
          </span>
        </div>

        {/* מחיר מעוצב */}
        <div className="price">{formatCurrencyILS(item.price)}</div>

        {/* מיקום */}
        <div className={styles.meta}>{item.location}</div>

        {/* תיאור (אם קיים) */}
        {item.description && <div>{item.description}</div>}

        {/* כפתורי פעולה - מופיעים רק אם הועברו callbacks */}
        {(onEdit || onDelete || onToggle) && (
          <div className={styles.actions}>
            {onEdit && (
              <button
                className="btn"
                onClick={() => onEdit(item)}
                aria-label="עריכת נכס"
              >
                ערוך
              </button>
            )}
            {onDelete && (
              <button
                className="btn danger"
                onClick={() => onDelete(item)}
                aria-label="מחיקת נכס"
              >
                מחק
              </button>
            )}
            {onToggle && (
              <button
                className="btn secondary"
                onClick={() => onToggle(item)}
                aria-label="שינוי סטטוס"
              >
                שנה סטטוס
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Dashboard.jsx - דף ניהול הנכסים האישי.
 *
 * תפקידים:
 * --------
 * 1. הצגת רשימת הנכסים של המשתמש המחובר
 * 2. הוספת נכס חדש דרך Modal
 * 3. עריכת נכס קיים
 * 4. מחיקת נכס (עם אישור)
 * 5. שינוי סטטוס (זמין/נמכר)
 *
 * State Management:
 * -----------------
 * - קורא session ו-users מ-Redux לזיהוי המשתמש
 * - קורא assets ומסנן רק את הנכסים של המשתמש
 * - שולח actions: addProperty, updateProperty, deleteProperty, toggleStatus
 *
 * Local State:
 * -----------
 * - isOpen: האם ה-Modal פתוח
 * - editing: הנכס שנערך כרגע (null = הוספה חדשה)
 *
 * זרימת עבודה:
 * ------------
 * 1. לחיצה על "הוסף נכס" → פותח Modal ריק
 * 2. לחיצה על "ערוך" → פותח Modal עם נתוני הנכס
 * 3. שמירה → dispatch ל-Redux + סגירת Modal
 * 4. מחיקה → אישור + dispatch
 * 5. שינוי סטטוס → dispatch מיידי
 *
 * CSS Modules:
 * -----------
 * - styles.header: כותרת עם כפתור
 */

import React, { useMemo, useState } from "react";
import styles from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";
import PropertyForm from "../../components/PropertyForm/PropertyForm.jsx";
import {
  addProperty,
  deleteProperty,
  toggleStatus,
  updateProperty,
} from "../../store/propertiesSlice.js";
import { toast } from "react-toastify";

// פונקציה: קומפוננטת ניהול נכסים - רשימה + הוספה/עריכה/מחיקה/סטטוס.
export default function Dashboard() {
  const dispatch = useDispatch();

  // קריאת נתוני אימות מ-Redux
  const session = useSelector((s) => s.auth.session);
  const users = useSelector((s) => s.auth.users);
  const currentUser = users.find((u) => u.id === session?.userId);

  // קריאת כל הנכסים
  const allAssets = useSelector((s) => s.properties.assets);

  // פונקציה: מסנן את נכסי המשתמש המחובר.
  // useMemo מונע סינון מחדש אם הנתונים לא השתנו.
  const myAssets = useMemo(
    () =>
      currentUser ? allAssets.filter((a) => a.userId === currentUser.id) : [],
    [allAssets, currentUser]
  );

  // State מקומי לניהול Modal
  const [isOpen, setIsOpen] = useState(false); // האם Modal פתוח
  const [editing, setEditing] = useState(null); // נכס נוכחי לעריכה

  // פונקציה: פתיחת מודאל ליצירה.
  // מאפס את editing כדי שהטופס יהיה ריק.
  const openNew = () => {
    setEditing(null);
    setIsOpen(true);
  };

  // פונקציה: פתיחת מודאל לעריכה.
  // שומר את הנכס ב-editing כדי שהטופס יטען אותו.
  const openEdit = (item) => {
    setEditing(item);
    setIsOpen(true);
  };

  // פונקציה: שמירת טופס (הוספה/עדכון) וסגירה.
  const handleSubmit = (data) => {
    if (!currentUser) return;

    if (editing) {
      // מצב עריכה - עדכן נכס קיים
      dispatch(updateProperty({ id: editing.id, updates: data }));
      toast.success("הנכס עודכן");
    } else {
      // מצב יצירה - הוסף נכס חדש
      dispatch(addProperty({ userId: currentUser.id, ...data }));
      toast.success("הנכס נוסף");
    }

    setIsOpen(false); // סגירת Modal
  };

  // פונקציה: מחיקת נכס.
  // מבקש אישור מהמשתמש לפני המחיקה.
  const handleDelete = (item) => {
    if (window.confirm("בטוח למחוק את הנכס?")) {
      dispatch(deleteProperty(item.id));
      toast.success("הנכס נמחק");
    }
  };

  // פונקציה: החלפת סטטוס (זמין ↔ נמכר).
  // ללא אישור - שינוי מיידי.
  const handleToggle = (item) => dispatch(toggleStatus(item.id));

  return (
    <div>
      {/* כותרת עם כפתור הוספה */}
      <div className={styles.header}>
        <h2>הנכסים שלי</h2>
        <button className="btn" onClick={openNew}>
          הוסף נכס חדש
        </button>
      </div>

      {/* הודעה אם אין נכסים */}
      {!myAssets.length && <p>אין נכסים עדיין. לחץ על "הוסף נכס חדש".</p>}

      {/* גריד כרטיסי הנכסים */}
      <div className="cardGrid">
        {myAssets.map((it) => (
          <PropertyCard
            key={it.id}
            item={it}
            onEdit={openEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Modal לטופס הוספה/עריכה */}
      {isOpen && (
        <div className="modalBackdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <PropertyForm
              initial={editing}
              onCancel={() => setIsOpen(false)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

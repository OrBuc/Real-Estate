import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice.js";
import Logo from "../../assets/logo.svg";

// פונקציה: מטפלת בלחיצה על כפתור התנתקות.
// מבצעת logout ומפנה לדף התחברות.
const handleLogoutClick = (dispatch, navigate) => {
  dispatch(logout()); // ניקוי session ב-Redux
  navigate("/login"); // מעבר לדף התחברות
};

// פונקציה: קומפוננטת Header - הצגת ניווט ומשתמש.
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // קריאת נתוני אימות מ-Redux
  const session = useSelector((s) => s.auth.session);
  const users = useSelector((s) => s.auth.users);

  // חיפוש המשתמש המחובר (אם קיים)
  const currentUser = users.find((u) => u.id === session?.userId);

  return (
    <header className={styles.wrap} aria-label="סרגל עליון">
      {/* לוגו ושם */}
      <div className={styles.brand}>
        <img className={styles.brandMark} src={Logo} alt="לוגו" />
        <div className={styles.logo}>נכסים בישראל</div>
      </div>

      {/* תפריט ניווט ראשי */}
      <nav className={styles.nav} aria-label="ניווט ראשי">
        <Link to="/">דף הבית</Link>
        <Link to="/search">חיפוש נכסים</Link>
        <Link to="/publish">פרסם נכס</Link>
        <Link to="/mortgage">מחשבון משכנתא</Link>
        {/* קישור לדשבורד עבור משתמש מחובר בלבד */}
        {currentUser && <Link to="/dashboard">הנכסים שלי</Link>}
      </nav>

      {/* אזור משתמש - משתנה לפי מצב חיבור */}
      <div className={styles.user}>
        {/* אם לא מחובר - קישורים להתחברות והרשמה */}
        {!currentUser && (
          <>
            <Link to="/login">התחברות</Link>
            <Link to="/register">הרשמה</Link>
          </>
        )}

        {/* אם מחובר - ברכה וכפתור התנתקות */}
        {currentUser && (
          <>
            <span>שלום, {currentUser.username}</span>
            <button
              className="btn secondary"
              onClick={() => handleLogoutClick(dispatch, navigate)}
              aria-label="התנתקות"
            >
              התנתקות
            </button>
          </>
        )}
      </div>
    </header>
  );
}

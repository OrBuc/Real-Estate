// פונקציה: Login – טופס התחברות עם אימייל/סיסמה ו-toast.
import React, { useState } from "react";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // פונקציה: ולידציה בסיסית לטופס.
  const validate = () => {
    const e = { email: "", password: "" };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "אימייל לא תקין";
    if (!password) e.password = "סיסמה נדרשת";
    setErrors(e);
    return !e.email && !e.password;
  };

  // פונקציה: שליחת טופס והפניה לדשבורד.
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      dispatch(login({ email, password }));
      toast.success("התחברת בהצלחה");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "שגיאה בהתחברות");
    }
  };

  return (
    <div className={styles.wrap}>
      <h2>התחברות</h2>
      <form onSubmit={onSubmit}>
        <div className="formRow">
          <label htmlFor="email">אימייל</label>
          <input
            id="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="formRow">
          <label htmlFor="password">סיסמה</label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button className="btn" type="submit">
          התחבר
        </button>
      </form>
      <p>
        אין לך משתמש? <Link to="/register">להרשמה</Link>
      </p>
    </div>
  );
}

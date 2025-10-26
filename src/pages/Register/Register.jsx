// פונקציה: Register – טופס הרשמה עם ולידציה ו-toast.
import React, { useState } from "react";
import styles from "./Register.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../store/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // פונקציה: ולידציה בסיסית
  const validate = () => {
    const e = { username: "", email: "", password: "" };
    if (!username.trim()) e.username = "שם משתמש נדרש";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "אימייל לא תקין";
    if (!password) e.password = "סיסמה נדרשת";
    setErrors(e);
    return Object.values(e).every((v) => !v);
  };

  // פונקציה: שליחת טופס והרשמה.
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      dispatch(register({ username, email, password }));
      toast.success("נרשמת בהצלחה! אפשר להתחבר");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "שגיאה בהרשמה");
    }
  };

  return (
    <div className={styles.wrap}>
      <h2>הרשמה</h2>
      <form onSubmit={onSubmit}>
        <div className="formRow">
          <label htmlFor="username">שם משתמש</label>
          <input
            id="username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>
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
          הרשמה
        </button>
      </form>
      <p>
        כבר רשום? <Link to="/login">להתחברות</Link>
      </p>
    </div>
  );
}

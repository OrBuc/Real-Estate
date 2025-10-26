import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Search from "./pages/Search/Search.jsx";
import Publish from "./pages/Publish/Publish.jsx";
import Mortgage from "./pages/Mortgage/Mortgage.jsx";
import { useSelector } from "react-redux";

// פונקציה: קומפוננטת מגן – גישה רק למשתמש מחובר.
// אם אין userId ב-session, מפנה אוטומטית ל-/login.
// replace מונע חזרה אחורה לדף המוגן.
const RequireAuth = ({ children }) => {
  const userId = useSelector((s) => s.auth.session?.userId);
  if (!userId) return <Navigate to="/login" replace />;
  return children;
};

// פונקציה: קומפוננטת השורש – שלד האפליקציה והנתיבים.
// מחלקת את המסך ל-Header קבוע ו-Content דינמי לפי הנתיב.
export default function App() {
  return (
    <div>
      {/* סרגל עליון קבוע בכל הדפים */}
      <div className="headerBar">
        <div className="container">
          <Header />
        </div>
      </div>

      {/* אזור התוכן המשתנה לפי הנתיב */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/mortgage" element={<Mortgage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* נתיב מוגן - רק למשתמשים מחוברים */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          {/* Fallback - כל נתיב לא מוכר חוזר ל-Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

// פונקציה: Home – דף הבית עם Hero ונכסים מומלצים.
import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";

export default function Home() {
  const userId = useSelector((s) => s.auth.session?.userId);
  const assets = useSelector((s) => s.properties.assets);
  const featured = assets.slice(0, 3);

  return (
    <div>
      <section className="hero" aria-label="אזור פתיח">
        <h1>מצא את הנכס המושלם עבורך</h1>
        <p>הדרך הקלה לנהל, לפרסם ולמצוא נכסים</p>
        <div className={styles.heroActions}>
          <Link to="/search" className="btn">
            חיפוש נכסים
          </Link>
          <Link to="/publish" className="btn secondary">
            פרסם נכס
          </Link>
          <Link to="/mortgage" className="btn secondary">
            מחשבון משכנתא
          </Link>
          {/* חדש: קיצור לדשבורד למשתמש מחובר */}
          {userId && (
            <Link to="/dashboard" className="btn">
              הנכסים שלי
            </Link>
          )}
          {!userId && (
            <Link to="/login" className="btn secondary">
              התחברות
            </Link>
          )}
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <h2>נכסים מומלצים</h2>
          <Link to="/search">צפה בכל הנכסים</Link>
        </div>
        <div className="cardGrid">
          {featured.map((it) => (
            <PropertyCard key={it.id} item={it} />
          ))}
        </div>
      </section>
    </div>
  );
}

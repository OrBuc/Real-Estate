// פונקציה: Search – סינון לפי טקסט/סטטוס/טווח מחירים ומיון.
import React, { useMemo, useState } from "react";
import styles from "./Search.module.css";
import { useSelector } from "react-redux";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";

export default function Search() {
  const all = useSelector((s) => s.properties.assets);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortKey, setSortKey] = useState("");

  const results = useMemo(() => {
    const arr = all.filter((a) => {
      if (status && a.status !== status) return false;
      if (q && !`${a.title} ${a.location} ${a.description || ""}`.includes(q))
        return false;
      const p = Number(a.price);
      if (minPrice && p < Number(minPrice)) return false;
      if (maxPrice && p > Number(maxPrice)) return false;
      return true;
    });
    if (sortKey === "priceAsc") arr.sort((x, y) => x.price - y.price);
    if (sortKey === "priceDesc") arr.sort((x, y) => y.price - x.price);
    return arr;
  }, [all, q, status, minPrice, maxPrice, sortKey]);

  return (
    <div>
      <div className={styles.header}>
        <h2>חיפוש נכסים</h2>
        <div className={styles.resultCount}>
          {results.length === 0 && "אין תוצאות"}
          {results.length === 1 && "תוצאה אחת"}
          {results.length > 1 && `${results.length} תוצאות`}
        </div>
      </div>

      <div className={styles.filters}>
        <input
          className="input"
          placeholder="חיפוש טקסט"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="חיפוש לפי טקסט"
        />
        <select
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="סינון לפי סטטוס"
        >
          <option value="">כל הסטטוסים</option>
          <option value="זמין">זמין</option>
          <option value="נמכר">נמכר</option>
        </select>
        <input
          className="input"
          placeholder="מחיר מינימלי"
          inputMode="numeric"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          aria-label="מחיר מינימלי"
        />
        <input
          className="input"
          placeholder="מחיר מקסימלי"
          inputMode="numeric"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          aria-label="מחיר מקסימלי"
        />
        <select
          className="input"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          aria-label="מיון תוצאות"
        >
          <option value="">ללא מיון</option>
          <option value="priceAsc">מחיר ↑</option>
          <option value="priceDesc">מחיר ↓</option>
        </select>
      </div>

      {results.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>לא נמצאו נכסים</h3>
          <p>נסה לשנות את קריטריוני החיפוש</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="cardGrid">
          {results.map((it) => (
            <PropertyCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </div>
  );
}

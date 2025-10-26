import React, { useMemo, useState } from "react";
import styles from "./LoanCalculator.module.css";
import { formatCurrencyILS } from "../../utils/format.js";

// פונקציה: קומפוננטת מחשבון הלוואה - חישוב אנונה.
export default function LoanCalculator() {
  // State לשדות הקלט
  const [amount, setAmount] = useState(""); // סכום ההלוואה
  const [rate, setRate] = useState(""); // ריבית שנתית באחוזים
  const [years, setYears] = useState(""); // מספר שנים

  // פונקציה: חישוב תשלומים לפי נוסחת אנונה.
  // useMemo מונע חישוב מחדש אם הערכים לא השתנו (אופטימיזציה).
  const { monthly, total, interest } = useMemo(() => {
    const P = Number(amount); // המרה למספר
    const r = Number(rate) / 100 / 12; // המרה לריבית חודשית (0.03 → 0.0025)
    const n = Number(years) * 12; // המרה למספר חודשים

    // בדיקת תקינות: אם חסר ערך, החזר 0
    if (!P || !r || !n) return { monthly: 0, total: 0, interest: 0 };

    // נוסחת אנונה: M = P × (r × (1+r)^n) / ((1+r)^n - 1)
    const m = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const totalPay = m * n; // סך כל התשלומים

    return {
      monthly: m, // תשלום חודשי
      total: totalPay, // סך תשלומים
      interest: totalPay - P, // סך ריבית (הפרש בין סך לסכום מקורי)
    };
  }, [amount, rate, years]); // חישוב מחדש רק אם אחד מאלה משתנה

  return (
    <div className={styles.wrap} aria-label="מחשבון הלוואה">
      <h3>מחשבון הלוואה</h3>

      {/* שדות קלט בגריד רספונסיבי */}
      <div className={styles.grid}>
        <div>
          <label htmlFor="amount">סכום הלוואה (₪)</label>
          <input
            id="amount"
            className="input"
            inputMode="numeric" // מקלדת מספרים במובייל
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rate">ריבית שנתית (%)</label>
          <input
            id="rate"
            className="input"
            inputMode="decimal" // מקלדת עשרונית
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="years">מספר שנים</label>
          <input
            id="years"
            className="input"
            inputMode="numeric"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
      </div>

      {/* תצוגת תוצאות - מתעדכנת אוטומטית */}
      <div className={styles.results}>
        <div>
          תשלום חודשי: <strong>{formatCurrencyILS(Math.round(monthly))}</strong>
        </div>
        <div>
          סך תשלומים: <strong>{formatCurrencyILS(Math.round(total))}</strong>
        </div>
        <div>
          סך ריבית: <strong>{formatCurrencyILS(Math.round(interest))}</strong>
        </div>
      </div>
    </div>
  );
}

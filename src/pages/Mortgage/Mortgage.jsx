// פונקציה: Mortgage – עמוד מחשבון המשכנתא (ללא תכנים אחרים).
import React from "react";
import styles from "./Mortgage.module.css";
import LoanCalculator from "../../components/LoanCalculator/LoanCalculator.jsx";

export default function Mortgage() {
  return (
    <div className={styles.wrap}>
      <LoanCalculator />
    </div>
  );
}

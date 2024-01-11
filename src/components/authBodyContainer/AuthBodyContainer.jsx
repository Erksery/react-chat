import React from "react";
import styles from "./AuthBodyContainer.module.scss";

export default function AuthBodyContainer({ children }) {
  return (
    <div className={styles.body}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

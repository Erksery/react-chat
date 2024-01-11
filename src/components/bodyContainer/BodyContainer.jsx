import React from "react";
import styles from "./BodyContainer.module.scss";
import Header from "../header/Header";

export default function BodyContainer({ children }) {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <div className={styles.container}>{children}</div>
      </div>
    </>
  );
}

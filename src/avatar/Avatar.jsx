import React from "react";
import styles from "./Avatar.module.scss";

function Avatar({ id }) {
  const colors = ["yellow", "lightgreen", "orange", "lightblue", "pink"];
  const userIdBase16 = parseInt(id, 16);
  const colorIndex = userIdBase16 % colors.length;
  const color = colors[colorIndex];

  return (
    <div style={{ backgroundColor: color }} className={styles.avatar}>
      t
    </div>
  );
}

export default Avatar;

import React from "react";
import styles from "./Avatar.module.scss";

function Avatar({ user }) {
  return (
    <div
      style={{ backgroundColor: user.avatarColor }}
      className={styles.avatar}
    >
      {user.loginUser[0]}
    </div>
  );
}

export default Avatar;

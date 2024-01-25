import React from "react";
import styles from "./Avatar.module.scss";

function Avatar({ id, login, color, onlineUsers }) {
  return (
    <>
      {id && (
        <div
          style={{ backgroundColor: color }}
          className={styles.avatar}
          translate="no"
        >
          {login && login[0]}
          {onlineUsers && (
            <div
              style={{
                backgroundColor: onlineUsers.includes(id)
                  ? "rgb(114, 255, 114)"
                  : "rgb(255, 109, 109)",
              }}
              className={styles.onlineIndicator}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Avatar;

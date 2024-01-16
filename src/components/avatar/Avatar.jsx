import React from "react";
import styles from "./Avatar.module.scss";

function Avatar({ user, onlineUsers }) {
  return (
    <>
      {user && (
        <div
          style={{ backgroundColor: user.avatarColor }}
          className={styles.avatar}
        >
          {user.loginUser[0]}

          <div
            style={{
              backgroundColor: onlineUsers.includes(user._id)
                ? "rgb(114, 255, 114)"
                : "rgb(255, 90, 90)",
            }}
            className={styles.onlineIndicator}
          />
        </div>
      )}
    </>
  );
}

export default Avatar;

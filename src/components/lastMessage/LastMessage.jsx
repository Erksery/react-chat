import React from "react";
import styles from "./LastMessage.module.scss";

function LastMessage({ userData, user, lastMessage }) {
  if (lastMessage) {
    if (lastMessage.recipient === user._id) {
      return (
        <div className={styles.lastMessageContainer}>
          <span>
            {userData.userId === lastMessage.sender
              ? "Вы: "
              : `${user.loginUser}: `}
          </span>
          <span className={styles.lastMessage}>{lastMessage.text}</span>
        </div>
      );
    }
  }

  return (
    <div className={styles.lastMessageContainer}>
      <span>
        {userData.userId === user.lastMessageData.sender
          ? "Вы: "
          : `${user.loginUser}: `}
      </span>
      <span className={styles.lastMessage}>{user.lastMessageData.text}</span>
    </div>
  );
}

export default LastMessage;

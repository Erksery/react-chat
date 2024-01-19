import React from "react";
import styles from "./MessageCard.module.scss";

function SenderMessage({ message, formatingMessageDate }) {
  return (
    <>
      <div className={styles.date}>{formatingMessageDate(message.date)}</div>
      <div
        style={{
          backgroundColor: "#4099FF",
        }}
        className={styles.message}
      >
        <span className={styles.messageText}>{message.text}</span>
      </div>
      {message.senderData && (
        <div
          style={{ backgroundColor: message.senderData.avatarColor }}
          className={styles.userAvatar}
        >
          {message.senderData && message.senderData.userLogin[0]}
        </div>
      )}
    </>
  );
}

export default SenderMessage;

import React from "react";
import styles from "./MessageCard.module.scss";

function RecipientMessage({ message, formatingMessageDate }) {
  return (
    <>
      {message.senderData && (
        <div
          style={{ backgroundColor: message.senderData.avatarColor }}
          className={styles.userAvatar}
        >
          {message.senderData && message.senderData.userLogin[0]}
        </div>
      )}

      <div
        style={{
          backgroundColor: "#4C4F56",
        }}
        className={styles.message}
      >
        <span className={styles.messageText}>{message.text}</span>
      </div>
      <div className={styles.date}>{formatingMessageDate(message.date)}</div>
    </>
  );
}

export default RecipientMessage;

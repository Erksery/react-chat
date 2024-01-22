import React from "react";
import styles from "./MessageCard.module.scss";
import { Link } from "react-router-dom";

function RecipientMessage({ message, formatingMessageDate, validateFile }) {
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
          backgroundColor: "#3e495d",
        }}
        className={styles.message}
      >
        {validateFile(message.file)}
        <span className={styles.messageText}>{message.text}</span>
      </div>
      <div className={styles.date}>{formatingMessageDate(message.date)}</div>
    </>
  );
}

export default RecipientMessage;

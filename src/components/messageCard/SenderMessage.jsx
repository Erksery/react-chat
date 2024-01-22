import React from "react";
import styles from "./MessageCard.module.scss";
import { Link } from "react-router-dom";

function SenderMessage({ message, formatingMessageDate, validateFile }) {
  return (
    <>
      <div className={styles.date}>{formatingMessageDate(message.date)}</div>

      <div
        style={{
          backgroundColor: "#4099FF",
        }}
        className={styles.message}
      >
        {validateFile(message.file)}
        <div className={styles.textContainer}>
          <span className={styles.messageText}>{message.text}</span>
        </div>
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

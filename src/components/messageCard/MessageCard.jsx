import React from "react";
import styles from "./MessageCard.module.scss";
import SenderMessage from "./SenderMessage";
import RecipientMessage from "./RecipientMessage";
import { Link } from "react-router-dom";
import Image from "../image/Image";

function MessageCard({ message, userData, imageRef }) {
  function formatingMessageDate(date) {
    if (date) {
      return checkDate(date);
    } else {
      const newDate = new Date();
      const ruDate = newDate.toLocaleString("ru");

      return checkDate(ruDate);
    }
  }

  function checkDate(date) {
    const time = date.split(", ")[1];
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    return `${hours}:${minutes}`;
  }

  function validateFile(file) {
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        return (
          <div className={styles.messageImage}>
            <Image file={file} imageRef={imageRef} />
          </div>
        );
      } else {
        return (
          <Link
            className={styles.messageFile}
            to={`http://localhost:5007/uploads/${file.fileName}`}
          >
            {file.originalName}
          </Link>
        );
      }
    }
  }

  return (
    <div
      style={{
        justifyContent:
          userData.userId === message.sender ? "flex-end" : "flex-start",
      }}
      className={styles.messageContainer}
    >
      {userData.userId === message.sender ? (
        <SenderMessage
          message={message}
          formatingMessageDate={formatingMessageDate}
          validateFile={validateFile}
        />
      ) : (
        <RecipientMessage
          message={message}
          formatingMessageDate={formatingMessageDate}
          validateFile={validateFile}
        />
      )}
    </div>
  );
}

export default MessageCard;

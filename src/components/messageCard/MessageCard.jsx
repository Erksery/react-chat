import React from "react";
import styles from "./MessageCard.module.scss";
import SenderMessage from "./SenderMessage";
import RecipientMessage from "./RecipientMessage";

function MessageCard({ message, userData }) {
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
        />
      ) : (
        <RecipientMessage
          message={message}
          formatingMessageDate={formatingMessageDate}
        />
      )}
    </div>
  );
}

export default MessageCard;

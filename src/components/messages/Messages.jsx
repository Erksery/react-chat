import React from "react";
import styles from "./Messages.module.scss";
import axios from "axios";

function Messages({ selectUserId, history, userData }) {
  if (!selectUserId) {
    return (
      <div className={styles.messages}>
        <p>Выберите пользователя</p>
      </div>
    );
  }
  return (
    <div className={styles.messages}>
      {!!selectUserId &&
        history &&
        history.map((message, index) => (
          <div
            style={{
              justifyContent:
                userData.userId === message.sender ? "flex-end" : "flex-start",
            }}
            className={styles.messageContainer}
          >
            <div
              style={{
                backgroundColor:
                  userData.userId === message.sender ? "#4099FF" : "#4C4F56",
              }}
              key={index}
              className={styles.message}
            >
              {message.text}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Messages;

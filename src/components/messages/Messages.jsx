import React, { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./Messages.module.scss";
import axios from "axios";

function Messages({ selectUserId, history, userData, loadingHistory }) {
  const messageContainer = useRef();

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [history]);

  if (loadingHistory) {
    return (
      <div className={styles.messages}>
        <div className={styles.board}>
          <p>Загрузка сообщений</p>
        </div>
      </div>
    );
  }

  if (!selectUserId) {
    return (
      <div className={styles.messages}>
        <div className={styles.board}>
          <p>Выберите пользователя</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className={styles.messages}>
        <div className={styles.board}>
          <p>Напишите пользователю</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={messageContainer} className={styles.messages}>
      {!!selectUserId &&
        history.map((message, index) => (
          <div
            key={message._id ? message._id : index}
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

import React, { useEffect, useRef, useState } from "react";
import styles from "./Messages.module.scss";

import MessageCard from "../messageCard/MessageCard";

function Messages({ selectUserId, history, loadingHistory, userData }) {
  const messageContainer = useRef();
  const triggerTest = useRef();

  useEffect(() => {
    if (triggerTest.current) {
      triggerTest.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [history]);

  if (!selectUserId) {
    return (
      <div className={styles.messages}>
        <div className={styles.board}>
          <p>Выберите пользователя</p>
        </div>
      </div>
    );
  }

  if (loadingHistory) {
    return (
      <div className={styles.messages}>
        <div className={styles.board}>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={messageContainer} className={styles.messages}>
      {history.map((message, index) => (
        <MessageCard
          key={message._id ?? index}
          message={message}
          userData={userData}
          index={index}
        />
      ))}
      <div ref={triggerTest} />
    </div>
  );
}

export default Messages;

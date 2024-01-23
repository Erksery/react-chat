import React, { useEffect, useRef, useState } from "react";
import styles from "./Messages.module.scss";

import MessageCard from "../messageCard/MessageCard";

function Messages({ selectUserId, history, loadingHistory, userData }) {
  const messageContainer = useRef();
  const scrollTrigger = useRef();
  const imageRef = useRef();

  const hancleScrollIntoView = () => {
    if (scrollTrigger.current) {
      scrollTrigger.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    hancleScrollIntoView();
    if (imageRef.current) {
      hancleScrollIntoView();
      imageRef.current.addEventListener("load", hancleScrollIntoView);

      // return () => {
      //   imageRef.current.removeEventlistener("load", hancleScrollIntoView);
      // };
    }
  }, [history, imageRef]);

  useEffect(() => {}, [imageRef]);

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
          imageRef={imageRef}
        />
      ))}
      <div ref={scrollTrigger} />
    </div>
  );
}

export default Messages;

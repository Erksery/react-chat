import React, { useEffect, useRef, useState } from "react";
import styles from "./Messages.module.scss";

import MessageCard from "../messageCard/MessageCard";
import { useDispatch } from "react-redux";
import { setMessagesLimit } from "../../store/limitMessagesSlice";

function Messages({
  selectUserId,
  history,
  loadingHistory,
  userData,
  selectMessages,
  setSelectMessages,
}) {
  const messageContainer = useRef();
  const scrollTrigger = useRef();
  const imageRef = useRef();

  const dispatch = useDispatch()

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

  console.log("Rerender");

  return (
    <div ref={messageContainer} className={styles.messages}>
      <div className={styles.moreLimit}>
        <button onClick={() => dispatch(setMessagesLimit()) }>Загрузить больше</button>
      </div>
      {history.map((message, index) => (
        <MessageCard
          selectMessages={selectMessages}
          setSelectMessages={setSelectMessages}
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

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Messages.module.scss";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";
import { useHistory } from "../../hooks/useHistory";
import { useGetMoreMessages } from "../../hooks/useGetMoreMessages";
import { useSpring, animated, useSpringRef } from "@react-spring/web";
import { Icon28PinDotSlashOutline } from "@vkontakte/icons";

function Messages({ selectUserId, history, userData }) {
  const messageContainer = useRef();

  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const messageSprings = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const { visible, scrollTrigger } = useScrollTrigger({ history });

  useEffect(() => {
    if (messageContainer.current) {
      scrollBottom();
    }
  }, [history]);

  function scrollBottom() {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }

  function formatingMessageDate(date) {
    return date ? date.split(", ")[1] : "Только что";
  }

  if (!selectUserId) {
    return (
      <div className={styles.messages}>
        <animated.div style={springs} className={styles.board}>
          <p>Выберите пользователя</p>
        </animated.div>
      </div>
    );
  }

  if (history.length === 0) {
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
              <span className={styles.messageDate}>
                <p>{formatingMessageDate(message.date)}</p>
              </span>
              <span className={styles.messageText}>{message.text}</span>
            </div>
          </div>
        ))}
      <div ref={scrollTrigger} />
    </div>
  );
}

export default Messages;

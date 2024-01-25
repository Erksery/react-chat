import React, { Fragment } from "react";
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
        <div
          className={
            message.file && message.file.length > 1
              ? styles.imagesContainer
              : styles.imageContainer
          }
        >
          {message.file &&
            message.file.map((file, index) => {
              return <Fragment key={index}>{validateFile(file)}</Fragment>;
            })}
        </div>

        {message.text && (
          <div className={styles.textContainer}>
            <span className={styles.messageText} translate="no">
              {message.text}
            </span>
          </div>
        )}
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

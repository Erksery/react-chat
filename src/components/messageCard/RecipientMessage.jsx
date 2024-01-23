import React, { Fragment } from "react";
import styles from "./MessageCard.module.scss";
import { Link } from "react-router-dom";

function RecipientMessage({ message, formatingMessageDate, validateFile }) {
  return (
    <>
      {message.senderData && (
        <div
          style={{ backgroundColor: message.senderData.avatarColor }}
          className={styles.userAvatar}
        >
          {message.senderData && message.senderData.userLogin[0]}
        </div>
      )}

      <div
        style={{
          backgroundColor: "#3e495d",
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
          <div
            style={{ justifyContent: "flex-start" }}
            className={styles.textContainer}
          >
            <span className={styles.messageText}>{message.text}</span>
          </div>
        )}
      </div>
      <div className={styles.date}>{formatingMessageDate(message.date)}</div>
    </>
  );
}

export default RecipientMessage;

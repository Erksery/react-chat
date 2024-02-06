import React, { useState } from "react";
import styles from "./MessageCard.module.scss";
import SenderMessage from "./SenderMessage";
import RecipientMessage from "./RecipientMessage";
import { Link } from "react-router-dom";
import Image from "../image/Image";
import { Icon28FolderFill } from "@vkontakte/icons";

function MessageCard({
  message,
  userData,
  imageRef,
  selectMessages,
  setSelectMessages,
}) {
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
            <Icon28FolderFill />
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>{file.originalName}</span>

              <p>
                {(Math.ceil((+file.size / (1024 * 1024)) * 100) / 100).toFixed(
                  2
                )}
                Мб
              </p>
            </div>
          </Link>
        );
      }
    }
  }

  return (
    <div
      onDoubleClick={
        selectMessages.length >= 0 &&
        (() => setSelectMessages((prev) => [...prev, message._id]))
      }
      onClick={() =>
        setSelectMessages(() =>
          selectMessages.filter((item) => item !== message._id)
        )
      }
      style={{
        backgroundColor:
          selectMessages && selectMessages.includes(message._id)
            ? "rgba(64, 153, 255, 0.647)"
            : "#333c4d",
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

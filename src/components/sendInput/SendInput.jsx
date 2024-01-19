import React, { useState } from "react";
import {
  Icon36Send,
  Icon48Linked,
  Icon28AttachOutline,
} from "@vkontakte/icons";
import styles from "./SendInput.module.scss";
import { useWsConnection } from "../../hooks/useWsConnection";

function SendInput({ userData, selectUserId, selectUserData }) {
  const [messageInputValue, setMessageInputValue] = useState("");
  const { ws } = useWsConnection();

  const message = (e) => {
    e.preventDefault();

    if (messageInputValue.length !== 0) {
      ws.send(
        JSON.stringify({
          message: {
            recipient: selectUserId,
            recipientData: selectUserData,
            text: messageInputValue,
            sender: userData.userId,
            senderData: userData,
          },
        })
      );
    }

    setMessageInputValue("");
  };

  const sendFile = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      ws.send(
        JSON.stringify({
          file: {
            recipientData: selectUserData,
            senderData: userData,
            fileData: {
              nameFile: event.target.files[0].name,
              data: reader.result,
            },
          },
        })
      );
    };
  };

  return (
    <form onSubmit={message} className={styles.chatInput}>
      <input
        value={messageInputValue}
        onChange={(e) => setMessageInputValue(e.target.value)}
        placeholder="Введите ваше сообщение..."
      />
      <label
        type="button"
        className={styles.fileUploadButton}
        onChange={sendFile}
      >
        <input type="file" hidden={true} />
        <Icon28AttachOutline width={28} height={28} />
      </label>
      <button>
        <Icon36Send width={28} height={28} />
      </button>
    </form>
  );
}

export default SendInput;

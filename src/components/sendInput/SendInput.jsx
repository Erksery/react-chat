import React, { useState } from "react";
import { Icon36Send } from "@vkontakte/icons";
import styles from "./SendInput.module.scss";
import { useWsConnection } from "../../hooks/useWsConnection";

function SendInput({ userData, selectUserId }) {
  const [messageInputValue, setMessageInputValue] = useState("");
  const { ws } = useWsConnection();

  const message = (e) => {
    e.preventDefault();

    ws.send(
      JSON.stringify({
        message: {
          recipient: selectUserId,
          text: messageInputValue,
          sender: userData.userId,
        },
      })
    );
    setMessageInputValue("");
  };
  return (
    <form onSubmit={message} className={styles.chatInput}>
      <input
        value={messageInputValue}
        onChange={(e) => setMessageInputValue(e.target.value)}
        placeholder="Введите ваше сообщение..."
      />
      <button>
        <Icon36Send width={28} height={28} />
      </button>
    </form>
  );
}

export default SendInput;

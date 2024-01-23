import React, { useState } from "react";
import { Icon36Send, Icon28AttachOutline } from "@vkontakte/icons";
import styles from "./SendInput.module.scss";
import { useWsConnection } from "../../hooks/useWsConnection";
import axios from "axios";
import { motion } from "framer-motion";
import FileUploadModal from "../fileUploadModal/FileUploadModal";

function SendInput({ userData, selectUserId, selectUserData }) {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [secureFile, setSecureFile] = useState([]);
  const [progress, setProgress] = useState(true);
  const [openFileContainer, setOpenFileContainer] = useState(false);

  const { ws } = useWsConnection();

  const message = (e) => {
    e.preventDefault();

    if (messageInputValue.length !== 0 || secureFile) {
      ws.send(
        JSON.stringify({
          message: {
            recipient: selectUserId,
            recipientData: selectUserData,
            text: messageInputValue,
            sender: userData.userId,
            senderData: userData,
            file: secureFile,
          },
        })
      );
    }

    setMessageInputValue("");
    setSecureFile(null);
    setOpenFileContainer(false);
  };

  const sendFile = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    try {
      const resData = await axios.post("/api/fileUpload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSecureFile((prev) => [...prev, { ...resData.data.fileData }]);
      setOpenFileContainer(true);
    } catch (err) {
      console.log("Error");
    } finally {
      setProgress(false);
    }
  };

  return (
    <form onSubmit={message} className={styles.chatInput}>
      <FileUploadModal
        openFileContainer={openFileContainer}
        setOpenFileContainer={setOpenFileContainer}
        progress={progress}
        secureFile={secureFile}
        setSecureFile={setSecureFile}
        sendFile={sendFile}
      />

      <input
        value={messageInputValue}
        onChange={(e) => setMessageInputValue(e.target.value)}
        placeholder="Введите ваше сообщение..."
      />
      <motion.label
        whileTap={{ scale: 0.9 }}
        type="button"
        className={styles.fileUploadButton}
        onChange={sendFile}
      >
        <input type="file" hidden={true} />
        <Icon28AttachOutline width={28} height={28} />
      </motion.label>
      <motion.button whileTap={{ scale: 0.9 }}>
        <Icon36Send width={28} height={28} />
      </motion.button>
    </form>
  );
}

export default SendInput;

import React, { useState } from "react";
import {
  Icon36Send,
  Icon28AttachOutline,
  Icon28Dismiss,
} from "@vkontakte/icons";
import styles from "./SendInput.module.scss";
import { useWsConnection } from "../../hooks/useWsConnection";
import axios from "axios";
import { motion } from "framer-motion";

function SendInput({ userData, selectUserId, selectUserData }) {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [secureFile, setSecureFile] = useState(null);
  const [progress, setProgress] = useState(true);
  const [openFileContainer, setOpenFileContainer] = useState(false);
  const [hoverSecureContainer, setHoverSecureContainer] = useState(false);
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
      setSecureFile(resData.data.fileData);
      setOpenFileContainer(true);
    } catch (err) {
      console.log("Error");
    } finally {
      setProgress(false);
    }
  };

  function validateFile(file) {
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        return (
          <div className={styles.imageContainer}>
            <div className={styles.secureFileImage}>
              <img src={`http://localhost:5007/uploads/${file.fileName}`} />
            </div>
            <div className={styles.imageData}>
              <label>{file.originalName}</label>
              <p>{(+file.size / (1024 * 1024)).toFixed(2)} Мб</p>
            </div>
          </div>
        );
      } else {
        return <div>{file.originalName}</div>;
      }
    }
  }

  return (
    <form onSubmit={message} className={styles.chatInput}>
      <motion.div
        initial={false}
        animate={openFileContainer ? "openContainer" : "closedContainer"}
        variants={{
          openContainer: { scale: 1, opacity: 1 },
          closedContainer: { scale: 0.7, opacity: 0 },
        }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoverSecureContainer(true)}
        onMouseLeave={() => setHoverSecureContainer(false)}
        className={styles.secureFileContainer}
      >
        {!progress && validateFile(secureFile)}

        <motion.div
          initial={false}
          animate={hoverSecureContainer ? "open" : "closed"}
          variants={{
            open: { scale: 1 },
            closed: { scale: 0 },
            openContainer: { opacity: 1 },
            closedContainer: { opacity: 0 },
          }}
          whileHover={{ scale: 1.3, cursor: "pointer" }}
          whileTap={{ scale: 1, cursor: "pointer" }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            setSecureFile(null);
            setOpenFileContainer(false);
          }}
          onMouseEnter={() => setHoverSecureContainer(true)}
          className={styles.clearSecure}
        >
          <Icon28Dismiss />
        </motion.div>
      </motion.div>

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

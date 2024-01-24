import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";
import styles from "./FileUploadModal.module.scss";
import {
  Icon28Dismiss,
  Icon28AddOutline,
  Icon28FolderFill,
} from "@vkontakte/icons";

function FileUploadModal({
  openFileContainer,
  setOpenFileContainer,
  progress,
  secureFile,
  setSecureFile,
  sendFile,
}) {
  const [hoverSecureContainer, setHoverSecureContainer] = useState(false);

  function validateFile(file) {
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        return (
          <div className={styles.imageContainer}>
            <div className={styles.secureFileImage}>
              <img src={`http://localhost:5007/uploads/${file.fileName}`} />
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.fileContainer}>
            <Icon28FolderFill />
            <span>{file.originalName}</span>
          </div>
        );
      }
    }
  }

  return (
    <motion.div
      initial={false}
      animate={openFileContainer ? "openContainer" : "closedContainer"}
      variants={{
        openContainer: { scale: 1, opacity: 1, visibility: "visible" },
        closedContainer: { scale: 0.7, opacity: 0, visibility: "hidden" },
      }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHoverSecureContainer(true)}
      onMouseLeave={() => setHoverSecureContainer(false)}
      className={styles.secureFileContainer}
    >
      <div className={styles.filesContainer}>
        {!progress &&
          secureFile &&
          secureFile.map((file, index) => (
            <Fragment key={index}>{validateFile(file)}</Fragment>
          ))}

        <div className={styles.imageContainer}>
          <label
            type="button"
            className={styles.secureFileImage}
            onChange={sendFile}
          >
            <Icon28AddOutline />
            <input type="file" hidden={true} />
          </label>
        </div>
      </div>

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
          setSecureFile([]);
          setOpenFileContainer(false);
        }}
        onMouseEnter={() => setHoverSecureContainer(true)}
        className={styles.clearSecure}
      >
        <Icon28Dismiss />
      </motion.div>
    </motion.div>
  );
}

export default FileUploadModal;
